const { default: axios } = require("axios");

const fetchContest = async () => {
	try {
		let response = await axios.get(
			"https://codeforces.com/api/contest.list?gym=false"
		);
		console.log(
			"🚀 ~ file: codeForce.js:8 ~ fetchContest ~ response:",
			response.data.result[0]
		);

		return response.data.result[0];
	} catch (e) {
		console.log(e.message);
	}
};
module.exports = { fetchContest };
