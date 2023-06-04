const express = require('express')
const { qrLinkSchema } = require('../../middlewares/validationSchemas/qrLinkSchema')
const { validateResult } = require('../../middlewares/validators/bodyValid')
const router = express.Router()

router.get('/:slug', require('../../controllers/User/QrLink/getQrLinkContr'))

router.post('/', qrLinkSchema, validateResult, require('../../controllers/User/QrLink/postQrLinkContr'))

module.exports = router