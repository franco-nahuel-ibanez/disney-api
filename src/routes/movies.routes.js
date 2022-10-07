const router = require('express').Router();
const {
    getAllMovies,
    getMovieById,
    createMovie,
    addCharacter,
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controller')

router.get('/', getAllMovies);

router.get('/:id', getMovieById)

router.post('/', createMovie);

router.post('/addCharacter/:id', addCharacter);

router.put('/:id', updateMovie)

router.delete('/:id', deleteMovie)

module.exports = router