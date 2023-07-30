const express = require('express');
const routerGenre = require('./genre.router');
const routerDirector = require('./director.router');
const routerActor = require('./actor.router');
const routerMovie = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', routerGenre)
router.use('/directors', routerDirector)
router.use('/actors', routerActor)
router.use('/movies', routerMovie)


module.exports = router;