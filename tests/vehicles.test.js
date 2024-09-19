const request = require("supertest");
const app = require("../app");
const Vehicle = require("../models/vehicle");
const connectTestDB = require("./testConnection");

require("dotenv").config(); // Carrega as variáveis de ambiente do .env

let testConnection;

beforeAll(async () => {
	testConnection = await connectTestDB();
});

afterAll(async () => {
	await testConnection.close();
});

// Limpar a coleção após cada teste
afterEach(async () => {
	await Vehicle.deleteMany();
});

describe("Vehicles API", () => {
	it("should create a new vehicle", async () => {
		const res = await request(app).post("/vehicles").send({
			licensePlate: "ABC-1234",
			color: "Red",
			brand: "Toyota",
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("licensePlate", "ABC-1234");
	});

	it("should get all vehicles", async () => {
		const vehicle = new Vehicle({
			licensePlate: "XYZ-5678",
			color: "Blue",
			brand: "Honda",
		});
		await vehicle.save();

		const res = await request(app).get("/vehicles");
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBe(1);
	});

	it("should get a vehicle by id", async () => {
		const vehicle = new Vehicle({
			licensePlate: "LMN-9876",
			color: "Green",
			brand: "Ford",
		});
		await vehicle.save();

		const res = await request(app).get(`/vehicles/${vehicle._id}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("licensePlate", "LMN-9876");
	});

	it("should update a vehicle", async () => {
		const vehicle = new Vehicle({
			licensePlate: "XYZ-5678",
			color: "Blue",
			brand: "Honda",
		});
		await vehicle.save();

		const res = await request(app).put(`/vehicles/${vehicle._id}`).send({
			color: "Black",
			brand: "Honda",
		});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("color", "Black");
	});

	it("should delete a vehicle", async () => {
		const vehicle = new Vehicle({
			licensePlate: "LMN-9876",
			color: "Green",
			brand: "Ford",
		});
		await vehicle.save();

		const res = await request(app).delete(`/vehicles/${vehicle._id}`);
		expect(res.statusCode).toEqual(200);
	});
});
