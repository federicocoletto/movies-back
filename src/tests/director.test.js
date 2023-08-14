const request = require("supertest");
const app = require("../app");
require("../models");

const directors_URL = "/api/v1/directors";

const director = {
	firstName: "Christopher",
	lastName: "Nolan",
	nationality: "American",
	image: "https://randomuser.me/api/portraits/men/85.jpg",
	birthday: "2023-05-19",
};
let directorId;

test("POST --> '/api/v1/directors' should return statusCode 201 and res.body.firstName === director.firstName", async () => {
	const res = await request(app).post(directors_URL).send(director);

	directorId = res.body.id;

	expect(res.statusCode).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(director.firstName);
});

test("GET --> '/api/v1/directors' should return status code 200 and res.body.toHaveLength === 1", async () => {
	const res = await request(app).get(directors_URL);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body.length).toBe(1);
});

test("GET ONE --> '/api/v1/directors/:id' should return status code 200 and res.body.firstName === director.firstName", async () => {
	const res = await request(app).get(`${directors_URL}/${directorId}`);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(director.firstName);
});

test("PUT --> '/api/v1/directors/:id' should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {
	const directorUpdate = {
		firstName: "Leonardo",
		lastName: "DiCaprio",
		nationality: "American",
		image: "https://randomuser.me/api/portraits/men/33.jpg",
		birthday: "1988-05-19",
	};
	const res = await request(app)
		.put(`${directors_URL}/${directorId}`)
		.send(directorUpdate);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE --> '/api/v1/directors/:id', should return status code 204", async () => {
	const res = await request(app).delete(`${directors_URL}/${directorId}`);

	expect(res.status).toBe(204);
});
