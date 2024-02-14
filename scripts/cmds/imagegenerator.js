 module.exports = {
    config: {
        name: "imagegenerator",
        version: "1.1",
        author: "𝙕𝙚𝙩𝙨𝙪",
        countDown: 1,
        role: 0,
        shortDescription: " commencer une conversation ",
        longDescription: "ignore this command",
        category: "no prefix",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "image generator") return message.reply(" Vᴏɪᴄɪ ʟᴇs ᴄᴏᴍᴍᴀɴᴅᴇs ǫᴜɪ ᴠᴏᴜs ᴘᴇʀᴍᴇᴛᴛʀᴏɴs ᴅᴇ ɢᴇɴᴇʀᴇʀ ᴅᴇs ɪᴍᴀɢᴇs : 𝗜𝗺𝗮𝗴𝗶𝗻𝗲 ✯ 𝗜𝗺𝗮𝗴𝗶𝗻𝗲2 ✯ 𝗜𝗺𝗮𝗴𝗶𝗻𝗲3 ✯ 𝗜𝗺𝗮𝗴𝗶𝗻𝗲4 ✯ 𝗚𝗲𝗻𝗶𝗺𝗴 ✯ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲 ✯ 𝗣𝗼𝗹𝗶  ✯ 𝗦𝗱𝘅𝗹 ✯彡");
}
};