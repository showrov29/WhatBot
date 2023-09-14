const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const metaRoutes = require("./routes/meta.routes");
const noticeRoutes = require("./routes/notice.routes");
const { default: axios } = require("axios");
const server = express();
server.use(express.json());
server.use("/", metaRoutes);
server.use("/", noticeRoutes);
const dbConnect = async () => {
	mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!"));
};
server.listen(process.env.PORT, (req, res) => {
	try {
		cron.schedule("*/5 * * * *", async () => {
			await axios
				.get(process.env.localhost + "/api/check-notice")
				.then((response) => {
					console.log(true);
				})
				.catch((err) => {
					console.log(err.message);
				});
		});
	} catch (err) {
		console.log(err.meesage);
	}
	dbConnect();
	console.log("listening on port 8000");
});
