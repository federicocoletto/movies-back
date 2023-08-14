const request = require("supertest");
const app = require("../app");
require("../models");

const genres_URL = "/api/v1/genres";

const genre = {
	name: "Sci-Fi"
};
let genreId;

test("POST --> '/api/v1/genres' should return statusCode 201 and res.body.firstName === genre.firstName", async () => {
	const res = await request(app).post(genres_URL).send(genre);

	genreId = res.body.id;

	expect(res.statusCode).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(genre.firstName);
});

test("GET --> '/api/v1/genres' should return status code 200 and res.body.toHaveLength === 1", async () => {
	const res = await request(app).get(genres_URL);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body.length).toBe(1);
});

test("GET ONE --> '/api/v1/genres/:id' should return status code 200 and res.body.firstName === genre.firstName", async () => {
	const res = await request(app).get(`${genres_URL}/${genreId}`);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(genre.firstName);
});

test("PUT --> '/api/v1/genres/:id' should return status code 200 and res.body.firstName === genreUpdate.firstName", async () => {
	const genreUpdate = {
		name: "Drama"
	};
	const res = await request(app)
		.put(`${genres_URL}/${genreId}`)
		.send(genreUpdate);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(genreUpdate.firstName);
});

test("DELETE --> '/api/v1/genres/:id', should return status code 204", async () => {
	const res = await request(app).delete(`${genres_URL}/${genreId}`);

	expect(res.status).toBe(204);
});
