const express = require("express");
const router = express.Router();
const Usage = require("../models/usage");
const Vehicle = require("../models/vehicle");
const Driver = require("../models/driver");

// Criar novo registro de utilização
router.post("/", async (req, res) => {
	try {
		const { vehicle, driver } = req.body;

		// Verificar se o veículo já está em uso
		const activeUsage = await Usage.findOne({ vehicle, endDate: null });
		if (activeUsage) return res.status(400).send("Vehicle is already in use");

		// Verificar se o motorista já está utilizando outro veículo
		const driverInUse = await Usage.findOne({ driver, endDate: null });
		if (driverInUse)
			return res.status(400).send("Driver is already using another vehicle");

		const usage = new Usage(req.body);
		await usage.save();
		res.status(201).send(usage);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Finalizar utilização
router.put("/:id/end", async (req, res) => {
	try {
		const usage = await Usage.findById(req.params.id);
		if (!usage) return res.status(404).send("Usage record not found");
		if (usage.endDate) return res.status(400).send("Usage already ended");

		usage.endDate = new Date();
		await usage.save();
		res.send(usage);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Listar registros de utilização
router.get("/", async (req, res) => {
	try {
		const usages = await Usage.find().populate("vehicle driver");
		res.send(usages);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
