const port = process.env.PORT || 3001;
const app = require("./app");
const { db } = require("./db");

const init = async () => {
	try {
		// await db.sync({ force: true });

		await db.sync();
		app.listen(port, () => console.log(`listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

init();

//dont touch me!
