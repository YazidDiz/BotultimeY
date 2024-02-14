module.exports = {
    config: {
        name: "nsfwcommand",
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
    if (event.body && event.body.toLowerCase() == "nsfwcommand") return message.reply(" Voici les commandes NSFw disponible : 𝘽𝙡𝙤𝙬𝙟𝙤𝙗彡𝘾𝙊𝙍𝙉𝙃𝙐𝘽✯ 𝘾𝙪𝙢𝙨𝙝𝙤𝙩彡 𝙂18彡 𝙂𝙞𝙧𝙡𝙭彡 𝙃𝙚𝙣𝙩𝙖𝙞彡 𝙃𝙚𝙣𝙩𝙖𝙞2彡 𝙃𝙚𝙣𝙩𝙖𝙞𝙫𝙞𝙙彡𝙃𝙚𝙣𝙩𝙖𝙞𝙫𝙞𝙙2彡 𝙃𝙀𝙉𝙏𝘼𝙄𝙑𝙄𝘿𝙀𝙊✯ 𝙃𝙜𝙞𝙛彡 𝙅𝙖𝙥𝙜𝙞𝙧𝙡彡 𝙆𝙖𝙣𝙙𝙖彡 𝙆𝙖𝙣𝙙𝙖2彡 𝙈𝙞𝙡𝙛彡 𝙈𝙞𝙡𝙛2彡 𝙉𝙨𝙛𝙬彡 𝙉𝙪𝙙𝙚彡 𝙋𝙖𝙣𝙩𝙞𝙚𝙘𝙡𝙤𝙨𝙚彡 𝙋𝙖𝙣𝙩𝙞𝙚𝙨𝙘𝙡𝙤𝙨𝙚𝙫2彡 𝙋𝙪𝙨𝙨𝙮彡 𝙍𝙚𝙙𝙧𝙤𝙤𝙢彡 𝙍𝙚𝙙𝙧𝙤𝙤𝙢𝙫2彡 𝙎𝙚𝙭𝙮彡 𝙔𝙪𝙧𝙞彡 ");
}
};