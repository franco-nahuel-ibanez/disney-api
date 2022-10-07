const {check} = require('express-validator')
const { handleValidation } = require('../utils/handleValidator')

const validationCreateMovie = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('date')
        .notEmpty().withMessage('Date is required'),
    check('qualification')
        .notEmpty().withMessage('Qualification is required')
        .isInt({min: 1, max: 5}).withMessage('Qualification must be between 1 and 5'),
        (req, res, next) => {
            return handleValidation(req, res, next)
        }
]

module.exports = {
    validationCreateMovie
}