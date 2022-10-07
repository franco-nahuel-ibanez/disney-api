const Character = require('../models/Character');
const Movie = require('../models/Movie');

//GET /api/characters
exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.json({
            ok: true,
            messages: 'Characters retrieved successfully',
            characters
        });
    } catch (error) {
        console.log(error);
    }
}

//GET /api/characters/:id
exports.getCharacterById = async (req, res) => {
    const {id} = req.params
    try {
        const character = await Character.findOne({ where: {id} })
        
        if(!character) {
            return res.status(404).json({
                ok: false,
                message: 'Character not found',
                character: null
            })
        }

        res.json({
            ok: true,
            message: 'Character found',
            character
        });
    } catch (error) {
        console.log(error)
    }
}

//POST /api/characters
exports.createCharacter = async (req, res) => {
    
    try {
        const {movieId} = req.body;
        let character = null

        if(!movieId) {
            character = await Character.create(req.body);
        }else{
            //Verify if the movie exists
            const movie = await Movie.findOne({where: {id: character.id}});
            if(!movie) {
                return res.status(404).json({message: 'Movie not exists'});
            }
    
            character = await Character.create({
                name: req.body.name,
                image: req.body.image,
                age: req.body.age,
                weight: req.body.weight,
                history: req.body.history,
            });
            character.addMovie(movie);
        }

        return res.json({
            ok: true,
            message: 'Character created',
            character
        });
    } catch (error) {
        console.error(error);
    }
}

//PUT /api/characters/:id
exports.updateCharacter = async (req, res) => {
    try {
        const {id} = req.params;
        //Verify if the character exists
        const character = await Character.findOne({ where:{id} });
    
        if(!character) {
            return res.status(404).json({message: 'Character not exists'});
        }

        const updatedCharacter = await Character.update(
            req.body, 
            {where: {id}},
        );

        res.status(200).json({
            ok: true,
            message: 'Character updated',
            "rows affected": updatedCharacter
        });

    }
    catch (error) {
        console.log(error)
    }
}

//DELETE /api/characters/:id
exports.deleteCharacter = async(req, res) => {
    const {id} = req.params;

    try {
        //Verify if the character exists
        const character = await Character.findOne({ where: {id} });
    
        if(!character) {
            return res.status(404).json({message: 'Character not exists'});
        }

        const deletedCharacter = await Character.destroy({ where: {id} });
        res.status(200).json({
            ok: true,
            message: 'Character deleted',
            character
        });
    }
    catch (error) {
        console.log(error)
    }
}