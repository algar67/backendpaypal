const { body } = require('express-validator')

const locale = ['es-ES']

const sellerInfoFields = [
  sellerName(),
  category(),
  storeAddress(),
  storeAddressAddInfo(),
]

const sellerName = () => {
  return body('sellerName')
    .exists()
    .withMessage("Seller name doesn't exist!")
    .notEmpty()
    .withMessage('Seller name is empty!')
    .isAlphanumeric(locale, { ignore: ' ' })
    .withMessage('First name only admits letters and numbers')
    .trim()
}

const category = () => {
  return body('category')
    .exists()
    .withMessage("Category doesn't exist!")
    .notEmpty()
    .withMessage('Category is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('Category only admits letters')
    .trim()
}

const storeAddress = () => {
  return body('storeAddress')
    .exists()
    .withMessage("Store address doesn't exist!")
    .notEmpty()
    .withMessage('Store address is empty!')
    .isAlphanumeric(locale, { ignore: ' ' })
    .withMessage('Store address only admits letters and numbers')
    .trim()
}

const storeAddressAddInfo = () => {
  return body('storeAddressAddInfo')
    .isAlphanumeric(locale, { ignore: ' ' })
    .withMessage('Store address only admits letters and numbers')
    .trim()
}

module.exports = { sellerInfoFields }
