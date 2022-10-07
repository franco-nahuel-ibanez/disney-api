const { validationResult } = require('express-validator');

exports.handleValidation = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).json({
            errors: error
        })
    }
}