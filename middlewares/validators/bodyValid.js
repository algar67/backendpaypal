const { validationResult, matchedData } = require('express-validator');

const validateResult = (req, res, next) => {
    removeUnwantedFields(req)

    try{
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(400).send({ errors: err.array() })
    }
}

const removeUnwantedFields = (req) => {
    const validData = matchedData(req, { includeOptionals: false })
    req.body = validData
}

module.exports = { validateResult }