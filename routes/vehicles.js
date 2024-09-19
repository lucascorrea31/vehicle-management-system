const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");

// Criar novo automóvel
router.post("/", async (req, res) => {
	try {
		const vehicle = new Vehicle(req.body);
		await vehicle.save();
		res.status(201).send(vehicle);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Atualizar automóvel
router.put("/:id", async (req, res) => {
	try {
		const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!vehicle) return res.status(404).send("Vehicle not found");
		res.send(vehicle);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Excluir automóvel
router.delete("/:id", async (req, res) => {
	try {
		const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
		if (!vehicle) return res.status(404).send("Vehicle not found");
		res.send(vehicle);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Recuperar automóvel por ID
router.get("/:id", async (req, res) => {
	try {
		const vehicle = await Vehicle.findById(req.params.id);
		if (!vehicle) return res.status(404).send("Vehicle not found");
		res.send(vehicle);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Listar automóveis com filtro por cor e marca
router.get("/", async (req, res) => {
	try {
		const { color, brand } = req.query;
		const filters = {};
		if (color) filters.color = color; // Filtro por cor
		if (brand) filters.brand = brand; // Filtro por marca

		const vehicles = await Vehicle.find(filters);
		res.send(vehicles);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
