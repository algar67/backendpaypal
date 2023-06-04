const express = require('express')
const router = express.Router()

router.get('/', require('../../controllers/User/PayMethods/getUserPayMethodsContr'))

router.post('/', require('../../controllers/User/PayMethods/postPayMetContr'))

module.exports = router