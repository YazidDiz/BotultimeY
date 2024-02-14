const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const stream = require('stream');


async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

module.exports = {
  config: {
    name: "cornhub",// api from jarif
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "𝘗𝘰𝘳𝘯𝘩𝘶𝘣 𝘮𝘢𝘪𝘴 𝘦𝘯 𝘱𝘭𝘶𝘴 𝘢𝘤𝘤𝘦𝘴𝘴𝘪𝘣𝘭𝘦"
    },
    longDescription: {
      en: "𝘗𝘰𝘳𝘯𝘩𝘶𝘣 𝘮𝘢𝘪𝘴 𝘦𝘯 𝘮𝘪𝘦𝘶𝘹"
    },
    category: "18+",
    guide: {
      en: "𝘝𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘦𝘯𝘵𝘳𝘦𝘻 ❝.𝙘𝙤𝙧𝙣𝙝𝙪𝙗 + 𝙡𝙚 𝙜𝙚𝙣𝙧𝙚 𝙙𝙚 𝙫𝙞𝙙𝙚𝙤 𝙦𝙪𝙚 𝙫𝙤𝙪𝙨 𝙫𝙤𝙪𝙡𝙚𝙯❞\n Ex : .𝘊𝘰𝘳𝘯𝘩𝘶𝘣 𝘩𝘦𝘯𝘵𝘢𝘪 𝘚𝘢𝘴𝘶𝘬𝘦 𝘏𝘪𝘯𝘢𝘵𝘢"
    }
  },
  onStart: async function ({ api, event, args }) {
    const category = args.join(' ');

    if (!category) {
      api.sendMessage({ body: '𝘝𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘦𝘯𝘵𝘳𝘦𝘻 ❝.𝙘𝙤𝙧𝙣𝙝𝙪𝙗 + 𝙡𝙚 𝙜𝙚𝙣𝙧𝙚 𝙙𝙚 𝙫𝙞𝙙𝙚𝙤 𝙦𝙪𝙚 𝙫𝙤𝙪𝙨 𝙫𝙤𝙪𝙡𝙚𝙯❞\n Ex : .𝘊𝘰𝘳𝘯𝘩𝘶𝘣 𝘩𝘦𝘯𝘵𝘢𝘪 𝘚𝘢𝘴𝘶𝘬𝘦 𝘏𝘪𝘯𝘢𝘵𝘢', mentions: [{ tag: 'pornhub', id: '100049894418762' }] }, event.threadID);
      return;
    }

    try {
      const { data } = await axios.get(`https://project-pornhub.onrender.com/ph?q=${category}&fbclid=IwAR0C2yig1ndXdOKrkbMg98OKIlNG-irVi9f_2q8NjvK03Ep3WYuf4nyvY44`);

      if (!data || data.length === 0) {
        api.sendMessage({ body: `No titles found for the category: ${category}.` }, event.threadID);
        return;
      }

      const titles = data.map((video, index) => `${index + 1}. ${video.title}`);
      const message = '𝘾𝙝𝙤𝙞𝙨𝙞𝙨𝙨𝙚𝙯 𝙪𝙣𝙚 𝙫𝙞𝙙𝙚𝙤 𝙚𝙣 𝙧𝙚𝙥𝙤𝙣𝙙𝙖𝙣𝙩 à 𝙘𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙥𝙖𝙧 𝙪𝙣 𝙙𝙚𝙨 𝙣𝙪𝙢𝙚𝙧𝙤 𝙨𝙪𝙞𝙫𝙖𝙣𝙩 :\n\n' + titles.join('\n');

      const tempFilePath = path.join(os.tmpdir(), 'cornhub_response.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(data));

      api.sendMessage({ body: message }, event.threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: 'cornhub',
          messageID: info.messageID,
          author: event.senderID,
          category,
          tempFilePath,
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while fetching data.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  },
  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, category, tempFilePath } = Reply;

    if (event.senderID !== author || !tempFilePath) {
      return;
    }

    const videoIndex = parseInt(args[0], 10);

    if (isNaN(videoIndex) || videoIndex <= 0) {
      api.sendMessage({ body: 'Invalid input. Please provide a valid number.' }, event.threadID, event.messageID);
      return;
    }

    try {
      const data = JSON.parse(fs.readFileSync(tempFilePath, 'utf-8'));

      if (!data || data.length === 0 || videoIndex > data.length) {
        api.sendMessage({ body: 'Invalid video number. Please choose a number within the range.' }, event.threadID, event.messageID);
        return;
      }

      const selectedVideo = data[videoIndex - 1];
      const videoUrl = selectedVideo.video_url;

      if (!videoUrl) {
        api.sendMessage({ body: 'Error: Video not found.' }, event.threadID, event.messageID);
        return;
      }


      const videoStream = await getStreamFromURL(videoUrl);


      await api.sendMessage({
        body: '🤭 𝙑𝙤𝙞𝙘𝙞 𝙫𝙤𝙩𝙧𝙚 𝙫𝙞𝙙𝙚𝙤 ⟱',
        attachment: videoStream,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the video.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  }
};