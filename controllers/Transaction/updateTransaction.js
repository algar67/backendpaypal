const Transaction = require('../../model/transactionModel')
const { UserManager } = require('../../model/userModel')

const updateTransaction = async (req, res) => {
  const condition = { transactionUuid: req.body.transactionUuid }
  const updateCols = { ...req.body }

  // double check transaction data? qrLink belongs to seller, buyeruuid is right?

  try {
    const transaction = await Transaction.updateData('transactions', updateCols, condition)
    exchangeFunds(transaction[0])

    return res.status(200).json(transaction)
  } catch (error) {
    console.log('postQrLink controller', error)

    const message =
      'An error occurred while processing your request. Please contact customer support.'
    return res.status(500).json({ error: message })
  }
}

const exchangeFunds = async ({ paymentMethodUuid, buyerUuid, sellerUuid, totalAmount }) => {
  if (paymentMethodUuid === 'buyerFunds') {
    const seller = await UserManager.selectBy('users', 'userUuid', sellerUuid)
    const newData = { funds: parseInt(seller[0].funds) + parseInt(totalAmount) }
    const condition = { userUuid: sellerUuid }
    await UserManager.updateData('users', newData, condition)

    const buyer = await UserManager.selectBy('users', 'userUuid', buyerUuid)
    const newData2 = { funds: parseInt(buyer[0].funds) - parseInt(totalAmount) }
    const condition2 = { userUuid: buyerUuid }
    await UserManager.updateData('users', newData2, condition2)
    return
  }
  if (paymentMethodUuid) {
    const seller = await UserManager.selectBy('users', 'userUuid', sellerUuid)
    const newData = { funds: parseInt(seller[0].funds) + parseInt(totalAmount) }
    const condition = { userUuid: sellerUuid }
    await UserManager.updateData('users', newData, condition)
  }
}

module.exports = updateTransaction
