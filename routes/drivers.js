const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");

// Criar novo motorista
router.post("/", async (req, res) => {
	try {
		const driver = new Driver(req.body);
		await driver.save();
		res.status(201).send(driver);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Atualizar motorista
router.put("/:id", async (req, res) => {
	try {
		const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!driver) return res.status(404).send("Driver not found");
		res.send(driver);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Excluir motorista
router.delete("/:id", async (req, res) => {
	try {
		const driver = await Driver.findByIdAndDelete(req.params.id);
		if (!driver) return res.status(404).send("Driver not found");
		res.send(driver);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Recuperar motorista por ID
router.get("/:id", async (req, res) => {
	try {
		const driver = await Driver.findById(req.params.id);
		if (!driver) return res.status(404).send("Driver not found");
		res.send(driver);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Listar motoristas com filtro por nome
router.get("/", async (req, res) => {
	try {
		const { name } = req.query;
		const filters = {};
		if (name) filters.name = new RegExp(name, "i"); // Filtro por nome

		const drivers = await Driver.find(filters);
		res.send(drivers);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
