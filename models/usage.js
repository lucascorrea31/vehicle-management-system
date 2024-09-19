const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
	startDate: { type: Date, required: true },
	endDate: { type: Date },
	reason: { type: String, required: true },
	vehicle: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Vehicle",
		required: true,
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
		required: true,
	},
});

module.exports = mongoose.model("Usage", UsageSchema);
