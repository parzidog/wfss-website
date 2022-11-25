const { User } = require("../db/models/User");

//user must be logged in/have a token
const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	requireToken,
};
