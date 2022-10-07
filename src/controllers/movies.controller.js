const Character = require("../models/Character")
const Movie = require("../models/Movie")

//GET /api/movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll({
            attributes: ['title', 'image','year', 'id'],
        })
        res.json({
            ok: true,
            messages: 'Movies retrieved successfully',
            movies
        })
    } catch (error) {
        console.log(error)
    }
}

//GET /api/movies/:id
exports.getMovieById = async (req, res) => {
    const {id} = req.params
    try {
        const movie = await Movie.findOne({
            where: {id},
            include: [{
                model: Character,
                attributes: ['name', 'image'],
                exclude: ['createdAt', 'updatedAt']
            }],
        })

        //const characters = await movie.getCharacters()

        if(!movie) {
            return res.status(404).json({
                ok: false,
                message: 'Movie not found',
                movie: null
            })
        }

        res.json({
            ok: true,
            messages: 'Movie retrieved successfully',
            movie
        })
    } catch (error) {
        console.log(error)
    }
}

//POST /api/movies
exports.createMovie = async (req, res) => {
    const {characterId} = req.body
    try {
        const character = await Character.findOne({ where: {id: characterId} })

        if(!character) {
            return res.status(404).json({
                ok: false,
                message: 'Character not found. Please, try again',
                movie: null
            })
        }

        const movie = await Movie.create({
            title: req.body.title,
            year: req.body.year,
            image: req.body.image,
            qualification: req.body.qualification,
        })

        movie.addCharacter(character)

        res.json({
            ok: true,
            message: 'Movie created successfully',
            movie
        })
    } catch (error) {
        console.log(error)
    }
}

//POST /api/movies/addCharacter/:id
exports.addCharacter = async (req, res) => {
    const {id} = req.params
    const {characterId} = req.body
    try {
        const movie = await Movie.findOne({ where: {id} })
        if(!movie) {
            return res.status(404).json({
                ok: false,
                message: 'Movie not found. Please, try again',
                movie: null
            })
        }

        const character = await Character.findOne({ where: {id: characterId} })

        if(!character) {
            return res.status(404).json({
                ok: false,
                message: 'Character not found. Please, try again',
                movie: null
            })
        }

        movie.addCharacter(character)
        res.json({
            ok: true,
            message: 'Character added successfully',
            movie
        })

    }catch (error) {
        console.log(error)
    }
}


//PUT /api/movies/:id
exports.updateMovie = async (req, res) => {
    const {id} = req.params
    try {
        const movie = await Movie.findOne({ where: {id} })

        if(!movie) {
            return res.status(404).json({
                ok: false,
                message: 'Movie not found. Please',
                movie: null
            })
        }

        movie.update({
            title: req.body.title,
            year: req.body.year,
            image: req.body.image,
            qualification: req.body.qualification,
        })

        res.json({
            ok: true,
            message: 'Movie updated successfully',
            movie
        })
    } catch (error) {
        console.log(error)
    }
}

//DELETE /api/movies/:id
exports.deleteMovie = async (req, res) => {
    const {id} = req.params
    try {
        const movie = await Movie.findOne({ where: {id} })
        if(!movie){
            return res.status(404).json({
                ok: true,
                message: 'Movie not found',
                movie: null
            })
        }

        const deletedMovie = await Movie.destroy({ where: {id} })

        res.status(200).json({
            ok: true,
            message: 'Deleted movie',
            movie
        })
    }catch(error){
        console.log(error)
    }
}