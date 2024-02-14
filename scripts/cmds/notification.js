const moment = require('moment-timezone');
const fs = require('fs');
const { getStreamsFromAttachment } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];
module.exports = {
	config: {
		name: "notification",
		aliases: ["notify", "noti"],
		version: "1.9",
		author: "Delfin",
		countDown: 5,
		role: 2,
		shortDescription: {
			en: "Send notification from admin to all box"
		},
		longDescription: {
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <Message>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		en: {
replySuccess: "❗| 𝑺𝒆𝒏𝒕 𝒚𝒐𝒖𝒓 𝒓𝒆𝒑𝒍𝒚 𝒕𝒐 𝒂𝒅𝒎𝒊𝒏 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚!",
feedback: "❈\n📝 ࿉𝑭𝒆𝒆𝒅𝒃𝒂𝒄𝒌 𝒇𝒓𝒐𝒎 𝒖𝒔𝒆𝒓🤳🏻࿉ %1:\n- ❉𝑼𝒔𝒆𝒓 𝑰𝑫🪪❉: %2%3\n\n᪥𝑪𝒐𝒏𝒕𝒆𝒏𝒕📩᪥:\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n%4\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n(❗: 𝑹𝒆𝒑𝒍𝒚 𝒕𝒉𝒊𝒔 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒔𝒆𝒏𝒅 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒖𝒔𝒆𝒓)",
sendByGroup: "\n-ꀩ𝑺𝒆𝒏𝒕 𝒇𝒓𝒐𝒎 𝒈𝒓𝒐𝒖𝒑🙋🏻‍♂️ꀩ: %1\n- ⚇𝑻𝒉𝒓𝒆𝒂𝒅 𝑰𝑫🪡🪪⚇: %2",
replyUserSuccess: "❗| 𝑺𝒆𝒏𝒕 𝒚𝒐𝒖𝒓 𝒓𝒆𝒑𝒍𝒚 𝒕𝒐 𝒕𝒉𝒆 𝒖𝒔𝒆𝒓 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚!",
reply: "❈𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮🌏❈\n⌘𝗗𝗮𝘁𝗲📆⌘: ${date} \nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n⌘𝗧𝗶𝗺𝗲⏱️⌘: ${time}\n📍 ♛Reply From Admin🤴🏻♛༒ ℤ𝔼𝕋𝕊𝕌࿅:\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n%2\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n(❗| 𝑹𝒆𝒑𝒍𝒚 𝒕𝒉𝒊𝒔 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒄𝒐𝒏𝒕𝒊𝒏𝒖𝒆 𝒔𝒆𝒏𝒅 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒂𝒅𝒎𝒊𝒏)",
			missingMessage: "❗| 𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒚𝒐𝒖 𝒘𝒂𝒏𝒕 𝒕𝒐 𝒔𝒆𝒏𝒅 𝒕𝒐 𝒂𝒍𝒍 𝒈𝒓𝒐𝒖𝒑𝒔",
			notification: "࿈ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ ғʀᴏᴍ ᴀᴅᴍɪɴ࿈",
			sendingNotification: "♻️ | 𝗦𝘁𝗮𝗿𝘁 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝗻𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗳𝗿𝗼𝗺 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘁 𝘁𝗼 %1 𝗰𝗵𝗮𝘁 𝗴𝗿𝗼𝘂𝗽𝘀",
			sentNotification: "✅ | 𝗦𝗲𝗻𝘁 𝗻𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝘁𝗼 %1 𝗴𝗿𝗼𝘂𝗽𝘀 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆",
			errorSendingNotification: "❗| 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝘁𝗼 %1 𝗴𝗿𝗼𝘂𝗽𝘀:\n%2"
		}
	},
	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang, usersData }) {
	  const { config } = global.GoatBot;
	  const { senderID, threadID, isGroup } = event;
	  if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
			const senderName = await usersData.getName(senderID);
		const now = moment().tz('Asia/Manila');
    const date = now.format('MMMM D, YYYY');
    const time = now.format('h:mm/A');
const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n\n⌘𝗠𝗘𝗦𝗦𝗔𝗚𝗘📩⌘:⤵️\n "${args.join(" ")}"\n\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n\n⌘𝗔𝗗𝗠𝗜𝗡 𝗡𝗔𝗠𝗘🤴🏻⌘:⤵️\n࿅ℤ𝔼𝕋𝕊𝕌࿅\n\nᚔᚔᚔᚔᚔᚔᚔᚔ⚈\n\n(❗: 𝑹𝒆𝒑𝒍𝒚 𝑻𝒐 𝑻𝒉𝒊𝒔 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝑰𝒇 𝒀𝒐𝒖 𝑾𝒂𝒏𝒕 𝑻𝒐 𝑹𝒆𝒑𝒍𝒚 𝑻𝒐 𝑻𝒉𝒊𝒔 𝑨𝒏𝒏𝒐𝒖𝒏𝒄𝒆𝒎𝒆𝒏𝒕 ) `,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
				global.GoatBot.onReply.set(wattingSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "noti2"
				});
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		return message.reply(msg);
	},
	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "noti2": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "noti2"
					});
				}, messageIDSender);
				break;
			}
		}
	}
};