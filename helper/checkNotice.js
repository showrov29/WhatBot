const axios = require("axios");
const cheerio = require("cheerio");
const notice = require("../model/notice.model");
const websiteURL = "https://www.aiub.edu/category/notices";
const { sendPayload } = require("./payload");
const checkNotice = async (req, res) => {
	const phoneNumber = ["+8801908539391", "+8801782706659"];
	try {
		const response = await axios.get(websiteURL);
		const $ = cheerio.load(response.data);

		// Extract and process notices
		$("ul.event-list li").each(async (index, element) => {
			const day = $(element).find("time span.day").text().trim();
			const month = $(element).find("time span.month").text().trim();
			const Link = $(element).find("a.info-link").attr("href");
			const Title = $(element).find("div.info h2").text().trim();
			const data = {
				date: day + " " + month,
				title: Title,
				link: Link,
			};
			if (
				day !== undefined &&
				Link !== undefined &&
				Title !== undefined &&
				month !== undefined
			) {
				const noticeText = `Time: ${day} ${month} \nTitle: ${Title}\nLink: https://www.aiub.edu/${Link}`;
				const newNotice = new notice(data);
				const isNotice = await notice.find({ title: Title, link: Link });

				if (isNotice.length == 0) {
					console.log(data);
					phoneNumber.forEach(async (element) => {
						await sendPayload(noticeText, element);
					});
					await newNotice.save();
				}
			}
		});
	} catch (error) {
		console.error("Error fetching or parsing website:", error);
	}
};
module.exports = { checkNotice };
