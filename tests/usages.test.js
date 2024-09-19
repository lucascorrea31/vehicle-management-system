const request = require("supertest");
const app = require("../app");
const Usage = require("../models/usage");
const Vehicle = require("../models/vehicle");
const Driver = require("../models/driver");
const connectTestDB = require("./testConnection");

require("dotenv").config(); // Carrega as variáveis de ambiente do .env

let testConnection;

beforeAll(async () => {
	testConnection = await connectTestDB();
});

afterAll(async () => {
	await testConnection.close();
});

afterEach(async () => {
	await Usage.deleteMany();
	await Vehicle.deleteMany();
	await Driver.deleteMany();
});

describe("Usages API", () => {
	it("should create a new usage", async () => {
		const vehicle = new Vehicle({
			licensePlate: "XYZ-5678",
			color: "Blue",
			brand: "Honda",
		});
		await vehicle.save();

		const driver = new Driver({ name: "John Doe" });
		await driver.save();

		const res = await request(app).post("/usages").send({
			vehicle: vehicle._id,
			driver: driver._id,
			startDate: new Date(),
			reason: "Business trip",
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("reason", "Business trip");
	});

	it("should list all usages", async () => {
		const vehicle = new Vehicle({
			licensePlate: "XYZ-5678",
			color: "Blue",
			brand: "Honda",
		});
		await vehicle.save();

		const driver = new Driver({ name: "John Doe" });
		await driver.save();

		const usage = new Usage({
			vehicle: vehicle._id,
			driver: driver._id,
			startDate: new Date(),
			reason: "Business trip",
		});
		await usage.save();

		const res = await request(app).get("/usages");
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBe(1);
	});

	it("should end a usage", async () => {
		const vehicle = new Vehicle({
			licensePlate: "XYZ-5678",
			color: "Blue",
			brand: "Honda",
		});
		await vehicle.save();

		const driver = new Driver({ name: "John Doe" });
		await driver.save();

		const usage = new Usage({
			vehicle: vehicle._id,
			driver: driver._id,
			startDate: new Date(),
			reason: "Business trip",
		});
		await usage.save();

		const res = await request(app).put(`/usages/${usage._id}/end`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("endDate");
	});
});
