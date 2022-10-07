const {check} = require('express-validator')
const { handleValidation } = require('../utils/handleValidator')

const validationCreateCharacter = [
    check('name')
        .notEmpty().withMessage('Name is required')
        .isLength({max: 10}).withMessage('Name must be less than 10 characters'),
    check('age',)
        .notEmpty().withMessage('Age is required')
        .isNumeric().withMessage('Age must be a number'),
    check('weight')
        .notEmpty().withMessage('Weight is required')
        .isNumeric().withMessage('Weight must be a number'),
    check('history')
        .notEmpty().withMessage('History is required')
        .isLength({max: 500}).withMessage('History must be less than 500 characters'),
    (req, res, next) => {
        return handleValidation(req, res, next)
    }
]


module.exports = {
    validationCreateCharacter,
}