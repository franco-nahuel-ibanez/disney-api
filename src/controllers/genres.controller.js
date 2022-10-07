const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll()

        res.status(200).json({
            ok: true,
            message: 'Genres retrieved successfully',
            genres
        })
    } catch (error) {
        console.log(error)
    }
}


exports.getGenreByName = async (req, res) => {
    const {name} = req.params
    try {
        const genre = await Genre.findOne({ 
            where: {name},
            include: 'movies', 
        })
        
        if(!genre){
            return res.status(404).json({
                ok: false,
                message: 'Genre not found. Please, try again',
                genre: null
            })
        }

        res.status(200).json({
            ok: true,
            message: 'Genre retrieved successfully',
            genre
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createGenre = async (req,res) => {
    const {movieId} = req.body
    try {

        const movie = await Movie.findOne({ where: {id:movieId} })

        if(!movie){
            return res.status(404).json({
                ok: false,
                message: 'Movie not found. Please, try again',
                genre: null
            })
        }

        const genre = await Genre.create({
            image: req.body.image,
            name: req.body.name,
        })

        await genre.addMovies(movie)

        res.status(201).json({
            ok: true,
            message: 'Genre create successfully',
            genre
        })
    } catch (error) {
        console.log(error)
    }
}