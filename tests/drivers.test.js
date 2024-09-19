const request = require("supertest");
const app = require("../app");
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
	await Driver.deleteMany();
});

describe("Drivers API", () => {
	it("should create a new driver", async () => {
		const res = await request(app).post("/drivers").send({ name: "John Doe" });

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("name", "John Doe");
	});

	it("should get all drivers", async () => {
		const driver = new Driver({ name: "Jane Doe" });
		await driver.save();

		const res = await request(app).get("/drivers");
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBe(1);
	});

	it("should get a driver by id", async () => {
		const driver = new Driver({ name: "Jane Doe" });
		await driver.save();

		const res = await request(app).get(`/drivers/${driver._id}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("name", "Jane Doe");
	});

	it("should update a driver", async () => {
		const driver = new Driver({ name: "John Smith" });
		await driver.save();

		const res = await request(app)
			.put(`/drivers/${driver._id}`)
			.send({ name: "John Doe" });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("name", "John Doe");
	});

	it("should delete a driver", async () => {
		const driver = new Driver({ name: "John Smith" });
		await driver.save();

		const res = await request(app).delete(`/drivers/${driver._id}`);
		expect(res.statusCode).toEqual(200);
	});
});
