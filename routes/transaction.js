var express = require('express')
var router = express.Router()
const {
  postTransactionSchema,
  updateTransactionSchema,
} = require('../middlewares/validationSchemas/transactionSchema.js')
const { validateResult } = require('../middlewares/validators/bodyValid')

router.post(
  '/',
  postTransactionSchema,
  validateResult,
  require('../controllers/Transaction/postTransaction.js'),
)

router.patch(
  '/complete',
  updateTransactionSchema,
  validateResult,
  require('../controllers/Transaction/updateTransaction.js'),
)

module.exports = router
