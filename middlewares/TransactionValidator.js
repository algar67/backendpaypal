const { check } = require('express-validator');
const { validateResult } = require('./validators/bodyValid');

const validateTransaction = [
    check("businessId")
    .exists()
    .withMessage("Business id param doesn't exist")
    .notEmpty()
    .withMessage("Business id param is empty"),
    check("personalId")
    .exists()
    .withMessage("Personal id param doesn't exist")
    .notEmpty()
    .withMessage("Personal id param is empty"),
    check("payMethodUuid")
    .exists()
    .withMessage("Pay method uuid param doesn't exist")
    .notEmpty()
    .withMessage("Pay method uuid param is empty"),
    check("productUuid")
    .exists()
    .withMessage("Product uuid param doesn't exist")
    .notEmpty()
    .withMessage("Product uuid param is empty"),
    check("totalAmount")
    .exists()
    .withMessage("Total amount param doesn't exist")
    .notEmpty()
    .withMessage("Total amount param is empty"),
    check("dateTime")
    .exists()
    .withMessage("Date time param doesn't exist")
    .notEmpty()
    .withMessage("Date time param is empty"),
    check("wentThrough")
    .exists()
    .withMessage("Went through param doesn't exist")
    .notEmpty()
    .withMessage("Went through param is empty"),
];

module.exports = { validateTransaction };