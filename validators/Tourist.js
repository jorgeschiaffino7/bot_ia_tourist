const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

exports.createTouristValidator = [
    check('latitude').isFloat().withMessage('Invalid latitude'),
    check('longitude').isFloat().withMessage('Invalid longitude'),
    (req, res, next) => handleValidator(req, res, next)
];

