const { checkSchema } = require('express-validator')

const locale = ['es-ES']

const postTransactionSchema = checkSchema({
  sellerUuid: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Seller uuid must not be empty' },
    isString: { errorMessage: 'Seller uuid must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: '-' }],
      errorMessage: 'Seller uuid must only contain letters or numbers',
    },
    trim: true,
  },
  totalAmount: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Total amount must not be empty' },
    isFloat: {
      errorMessage: 'Total amount must be a number',
    },
    trim: true,
  },
})

const updateTransactionSchema = checkSchema({
  paymentMethodUuid: {
    in: ['body'],
    optional: true,
    notEmpty: { errorMessage: 'Payment method uuid must not be empty' },
    isString: { errorMessage: 'Payment method uuid must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: '_-' }],
      errorMessage: 'Payment method uuid uuid must only contain letters or numbers',
    },
    trim: true,
  },
  transactionUuid: {
    in: ['body'],
    optional: true,
    notEmpty: { errorMessage: 'Transaction uuid must not be empty' },
    isString: { errorMessage: 'Transaction uuid must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: '-' }],
      errorMessage: 'Transaction uuid must only contain letters or numbers',
    },
    trim: true,
  },
  userCompleted: {
    in: ['body'],
    optional: true,
    notEmpty: { errorMessage: 'User completed must not be empty' },
    isBoolean: {
      errorMessage: 'User completed must be a boolean',
    },
    trim: true,
  },
  wentThrough: {
    in: ['body'],
    optional: true,
    notEmpty: { errorMessage: 'Went through must not be empty' },
    isBoolean: {
      errorMessage: 'Went through must be a boolean',
    },
    trim: true,
  },
})

module.exports = { postTransactionSchema, updateTransactionSchema }
