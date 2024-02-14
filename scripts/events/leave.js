const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: "{userName} đã {type} khỏi nhóm"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left",
			leaveType2: "was kicked from",
			defaultLeaveMessage: "𝗔𝗱𝗶𝗼𝘀 {userName} !\ 𝘝𝘰𝘶𝘴 𝘷𝘦𝘯𝘦𝘻 𝘥𝘦 𝘲𝘶𝘪𝘵𝘵𝘦𝘳 𝘤𝘦 𝘨𝘳𝘰𝘶𝘱𝘦. 𝘗𝘶𝘪𝘴𝘴𝘪𝘦𝘻 𝘷𝘰𝘶𝘴 𝘳𝘦𝘫𝘰𝘪𝘯𝘥𝘳𝘦 𝘭𝘦 𝘱𝘢𝘳𝘢𝘥𝘪𝘴 (𝘊'𝘦𝘴𝘵 𝘱𝘢𝘴 𝘴𝘶𝘳)                      | 𝗭𝗘𝗧𝗦𝗨 𝗔𝗶 𝗽𝗼𝘂𝗿 𝘃𝗼𝘂𝘀 𝘀𝗲𝗿𝘃𝗶𝗿 💬 | "
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage)
					return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID())
					return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// {userName}   : name of the user who left the group
				// {type}       : type of the message (leave)
				// {boxName}    : name of the box
				// {threadName} : name of the box
				// {time}       : time
				// {session}    : session

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				leaveMessage = leaveMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g, hours <= 10 ?
						getLang("session1") :
						hours <= 12 ?
							getLang("session2") :
							hours <= 18 ?
								getLang("session3") :
								getLang("session4")
					);

				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};