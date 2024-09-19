const mongoose = require("mongoose");

const connectTestDB = async () => {
	// Verifica se a conexão está fechada
	if (mongoose.connection.readyState === 0) {
		const dbHost = process.env.DB_HOST || "localhost";
		const dbName = process.env.DB_NAME || "car-rental";
		const dbUser = process.env.DB_USER || "admin";
		const dbPass = process.env.DB_PASS || "admin";

		const url = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}-test`;
		return mongoose.createConnection(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	return mongoose.connection;
};

module.exports = connectTestDB;
