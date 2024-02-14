const axios = require('axios');

module.exports = {
	config: {
		name: "yuri",
//		aliases: [""],
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 2,
		shortDescription: "get random milf image",
		longDescription: "",
		category: "18+",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)

			try {
				let res = await axios.get(`https://www.nguyenmanh.name.vn/api/nsfw/yuri?apikey=krwWfbvh`)


				let res2 = res.data
				let img = res2.url

				const form = {
					body: ` `

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) {
				message.reply(`🥺 Not Found`)
			}


	}
};