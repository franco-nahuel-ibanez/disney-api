const router = require('express').Router();
const {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} = require('../controllers/character.controller');
const { 
    validationCreateCharacter,
} = require('../validators/character');

router.get('/', getAllCharacters);

router.get('/:id', getCharacterById);

router.post('/', validationCreateCharacter, createCharacter);

router.put('/:id', updateCharacter);

router.delete('/:id', deleteCharacter);


module.exports = router;