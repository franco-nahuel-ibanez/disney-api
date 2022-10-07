const router = require('express').Router()

const {getAllGenres, getGenreByName, createGenre} = require('../controllers/genres.controller')


router.get('/', getAllGenres)

router.get('/:name', getGenreByName)

router.post('/', createGenre)




module.exports = router