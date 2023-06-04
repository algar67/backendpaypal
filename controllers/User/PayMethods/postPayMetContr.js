const { v4 } = require('uuid')
const PayMethod = require('../../../model/payMethodsModel')

const postPayMet = async (req, res) => {
  const newPayMet = { 
    userUuid: req.userUuid, 
    paymentMethodUuid: v4(),
    ...req.body }
    
  try {
    const payMet = await PayMethod.insertData('paymentMethods', newPayMet)
    return res.status(201).json(payMet)
  } catch (error) {
    console.log('postPayMet controller', error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}
module.exports = postPayMet
