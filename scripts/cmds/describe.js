const axios = require("axios");

module.exports = {
  config: {
    name: "describe",
    aliases: ["d"],
    version: "1.1",
    author: "Oniichan",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "",
    },
    longDescription: {
      vi: "",
      en: "",
    },
    category: "box chat",
    guide: "",
  },

  onStart: async function ({ event, message, getLang, threadsData, api }) {
    if (event.type === "message_reply") {
      if (event.messageReply.attachments.length > 0 && event.messageReply.attachments[0].type === "photo") {
        try {
          message.reply("✅ | Synthesizing...");

          const url = event.messageReply.attachments[0].url;
          let img = await getBase64(url);
          const res = await axios.post("https://vyroai-imagine.6owo9.repl.co/describe", {
            image: img,
          });
          if (res.data.description) {
            let description = res.data.description;
            const regex = /(\boppai\b|\becchi\b|\bboobs\b|[-.()#;])/gi;
            description = description.replace(regex, "");
            
            message.reply({
              body: description
            });
          }
        } catch (e) {
          console.log(e);
          message.reply("🥺 Server is busy, please try again later.");
        }
      } else {
        message.reply("Only reply to images");
      }
    } else {
      message.reply("Only reply to images");
    }
  },
};

async function getBase64(url) {
  let resp = await axios.get(url, { responseType: "arraybuffer" });
  let base64 = Buffer.from(resp.data).toString("base64");

  return base64;
}
