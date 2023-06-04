const QrLink = require('../../../model/qrLinkModel')
const { v4: uuidv4 } = require('uuid')

const postQrlink = async (req, res) => {
  try {
    const qrLink = await QrLink.insertData('qrLinks', newQrLinkData(req))
    return res.status(200).json(qrLink)
  } catch (error) {
    console.log('postQrLink controller', error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

const newQrLinkData = (req) => {
  return {
    sellerUuid: req.userUuid,
    checkoutType: req.body.checkoutType,
    totalAmount: req.body.totalAmount,
    linkSlug: uuidv4()
  }
}

module.exports = postQrlink
