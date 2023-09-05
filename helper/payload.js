const axios = require("axios");

require("dotenv").config();
const sendPayload = async (message, userNumber) => {
	try {
		const response = await axios.post(
			process.env.metaPayloadUrl,
			{
				messaging_product: "whatsapp",
				to: userNumber,
				type: "text",
				text: {
					body: message,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.metaApiBareerToken}`,

					"Content-Type": "application/json",
				},
			}
		);

		console.log("Payload sent successfully");
		return 200;
	} catch (error) {
		console.log("Error sending payload to message", error.message);
		return 500;
	}
};

module.exports = { sendPayload };
