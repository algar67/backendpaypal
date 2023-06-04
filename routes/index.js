const express = require('express');
const router = express.Router();

router.use('/user', require("./user/index")); 

router.use('/transaction', require("./transaction"));

module.exports = router;
