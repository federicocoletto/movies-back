const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");
require("../models");

const movies_URL = "/api/v1/movies";

const movie = {
	name: "12 Movies",
	image: "image",
	synopsis: "image",
	releaseYear: "2012",
};
let movieId;

test("POST --> '/api/v1/movies' should return statusCode 201 and res.body.name === movie.name", async () => {
	const res = await request(app).post(movies_URL).send(movie);
	
	movieId = res.body.id;
	
	expect(res.statusCode).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(movie.name);
});

test("GET --> '/api/v1/movies' should return status code 200 and res.body.toHaveLength === 1", async () => {
	const res = await request(app).get(movies_URL);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body.length).toBe(1);
});

test("GET ONE --> '/api/v1/movies/:id' should return status code 200 and res.body.name === movie.name", async () => {
	const res = await request(app).get(`${movies_URL}/${movieId}`);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(movie.name);
});

test("PUT --> '/api/v1/movies/:id' should return status code 200 and res.body.name === movieUpdate.name", async () => {
	const movieUpdate = {
		name: "Sr & Sra Smith",
		image: "image",
		synopsis: "image",
		releaseYear: "2012",
	};
	const res = await request(app)
		.put(`${movies_URL}/${movieId}`)
		.send(movieUpdate);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(movieUpdate.name);
});

test("POST --> '/api/v1/movies/:id/genres' should return statusCode 200 and res.body.length === 1", async () => {
	const genre = {
		name: "Sci-Fi",
	};

	const createGenre = await Genre.create(genre);

	const res = await request(app)
		.post(`${movies_URL}/${movieId}/genres`)
		.send([createGenre.id]);

	expect(res.statusCode).toBe(200);
	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body[0].id).toBe(createGenre.id);

	await createGenre.destroy()
});

test("POST --> '/api/v1/movies/:id/directors' should return statusCode 200 and res.body.length === 1", async () => {
	const director = {
		firstName: "Christopher",
		lastName: "Nolan",
		nationality: "American",
		image: "https://randomuser.me/api/portraits/men/85.jpg",
		birthday: "2023-05-19",
	};

	const createDirector = await Director.create(director);

	const res = await request(app)
		.post(`${movies_URL}/${movieId}/directors`)
		.send([createDirector.id]);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body[0].id).toBe(createDirector.id);

	await createDirector.destroy();
});

test("POST --> '/api/v1/movies/:id/actors' should return statusCode 200 and res.body.length === 1", async () => {
	const actor = {
		firstName: "Brad",
		lastName: "Pitt",
		nationality: "American",
		image: "https://randomuser.me/api/portraits/men/85.jpg",
		birthday: "2023-05-19",
	};

	const createActor = await Actor.create(actor);

	const res = await request(app)
		.post(`${movies_URL}/${movieId}/actors`)
		.send([createActor.id]);

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body[0].id).toBe(createActor.id);

	await createActor.destroy();
});

test("DELETE --> '/api/v1/movies/:id', should return status code 204", async () => {
	const res = await request(app).delete(`${movies_URL}/${movieId}`);

	expect(res.status).toBe(204);
});
