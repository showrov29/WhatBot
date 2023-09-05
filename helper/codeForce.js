const { default: axios } = require("axios");

const fetchContest = async () => {
	try {
		let response = await axios.get();
		console.log(
			"🚀 ~ file: codeForce.js:6 ~ fetchContest ~ response:",
			response.data
		);
	} catch (e) {
		console.log(e.message);
	}
};
module.exports = { fetchContest };
