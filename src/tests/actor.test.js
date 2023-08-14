const request = require("supertest");
const app = require("../app");
require('../models');

const actors_URL = "/api/v1/actors";

const actor = {
	firstName: "Brad",
	lastName: "Pitt",
	nationality: "American",
	image: "https://randomuser.me/api/portraits/men/85.jpg",
	birthday: "2023-05-19",
};
let actorId;

test("POST --> '/api/v1/actors' should return statusCode 201 and res.body.firstName === actor.firstName", async () => {
	const res = await request(app).post(actors_URL).send(actor);

	actorId = res.body.id

	expect(res.statusCode).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(actor.firstName);
});

test("GET --> '/api/v1/actors' should return status code 200 and res.body.toHaveLength === 1", async () => {
	const res = await request(app).get(actors_URL);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body.length).toBe(1);
});

test("GET ONE --> '/api/v1/actors/:id' should return status code 200 and res.body.firstName === actor.firstName", async () => {
	const res = await request(app).get(`${actors_URL}/${actorId}`);
	
	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT --> '/api/v1/actors/:id' should return status code 200 and res.body.firstName === actorUpdate.firstName", async () => {
	const actorUpdate = {
		firstName: "Leonardo",
		lastName: "DiCaprio",
		nationality: "American",
		image: "https://randomuser.me/api/portraits/men/33.jpg",
		birthday: "1988-05-19",
	};
	const res = await request(app).put(`${actors_URL}/${actorId}`).send(actorUpdate);
	
	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE --> '/api/v1/actors/:id', should return status code 204", async () => {
	const res = await request(app).delete(`${actors_URL}/${actorId}`);

	expect(res.status).toBe(204);
});