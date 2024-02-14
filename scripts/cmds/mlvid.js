const axios = require('axios');

module.exports = {
  config: {
    name: "mlvid",
    aliases: ["mlbb"],
    version: "1.0",
    author: "Strawhat Luffy & kshitiz",//mero name na hatau hai afno cmd xodera tmro banaideko xu haha
    countDown: 5,
    role: 0,
    shortDescription: "Mlbb video",
    longDescription: "Get Mlbb videos.",
    category: "Game",
    guide: "{pn}"
  },

  onStart: async function ({ message, args }) {
    const BASE_URL = `https://apibard.hvcker2004.repl.co/videogame`;
    message.reply("Loading Ml Videos.");

    try {
      let res = await axios.get(BASE_URL);

      if (res.data && res.data.data && res.data.data.play) {
        let mlbb = res.data.data.play;
        const form = {
          body: ``//body ne hala 
        };
        form.attachment = await global.utils.getStreamFromURL(mlbb);
        message.reply(form);
      } else {
        message.reply("Video not found in the response.");
      }
    } catch (e) {
      message.reply("An Error Occurred While Processing Your Request.");
      console.log(e);
    }
  }
};
