const sequelize = require('sequelize');
const { User } = require('../db');

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

//user must be an admin
const isAdmin = async (req, res, next) => {
	if (!req.user.isAdmin) {
		res.status(403).send('must have correct privileges');
	} else {
		next();
	}
};

module.exports = {
	requireToken,
	isAdmin,
};
