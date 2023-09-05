require("dotenv").config();

const metaVerification = (req, res) => {
	if (
		req.query["hub.mode"] == "subscribe" &&
		req.query["hub.verify_token"] == process.env.metaVerificationToken
	) {
		console.log("verifying successful");
		res.send(req.query["hub.challenge"]);
	} else {
		console.log("verifying failed");
		res.sendStatus(400);
	}
};

const metaData = (req, res) => {
	const data = req.body;
	if (data) {
		const senderContacts = data["entry"][0]["changes"][0]["value"]["contacts"];
		const status =
			data["entry"][0]["changes"][0]["value"]?.["statuses"]?.[0]["status"];
		const recipientNumber =
			data["entry"][0]["changes"][0]["value"]["statuses"]?.[0]["recipient_id"];
		const senderMessage =
			data["entry"][0]["changes"][0]["value"]["messages"]?.[0]["text"]["body"];

		const userNumber = senderContacts && senderContacts[0]["wa_id"];
	}
	res.sendStatus(200);
};

module.exports = { metaData, metaVerification };
