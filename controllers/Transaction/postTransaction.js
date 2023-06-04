const { v4: uuid } = require('uuid')
const DatesHelp = require('../../helpers/datesHelp')
const Transaction = require('../../model/transactionModel')

const postTransaction = async (req, res) => {
  const newTransaction = {
    transactionUuid: uuid(),
    buyerUuid: req.userUuid,
    paymentMethodUuid: 'not selected',
    ...req.body,
    wentThrough: false,
    userCompleted: false,
    geolocation: '(-122.4194, 37.7749)',
  }
  // double check transaction data? qrLink belongs to seller, 

  try {
    const transaction = await Transaction.insertData('transactions', newTransaction)
    return res.status(200).json(transaction)
  } catch (error) {
    console.log('postQrLink controller', error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = postTransaction
