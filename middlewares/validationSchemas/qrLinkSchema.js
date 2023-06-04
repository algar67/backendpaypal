const { checkSchema } = require('express-validator')

const locale = ['es-ES']

const qrLinkSchema = checkSchema({
  checkoutType: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Checkout type must not be empty' },
    isString: { errorMessage: 'Checkout type must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Checkout type must only contain letters',
    },
    trim: true,
  },
  totalAmount: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'totalAmount must not be empty' },
    isInt: { errorMessage: 'totalAmount must be a number' },
    trim: true,
  },
})

module.exports = { qrLinkSchema }
