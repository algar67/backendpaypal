const PayMethod = require('../../../model/payMethodsModel')

const getUserPayMethods = async (req, res) => {
  const userUuid = req.userUuid

  try {
    const dbRes = await PayMethod.selectBy('paymentMethods', 'userUuid', userUuid)

    if (!dbRes) {
      return res.status(200).json([])
    }

    return res.status(200).json(dbRes)
  } catch (error) {
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = getUserPayMethods
