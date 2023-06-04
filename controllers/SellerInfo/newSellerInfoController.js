const { SellerInfo } = require('../../model/sellerInfoModel')
const { UserManager } = require('../../model/userModel')

const newSellerInfo = async (req, res) => {
  const inputSellerName = req.body.sellerName

  const dbSellerName = await SellerInfo.selectBy('sellerInfo', 'sellerName', inputSellerName)

  if (dbSellerName) return res.status(400).json({ error: 'Name taken. Sorry' })

  const newSellerInfo = {
    userUuid: req.userUuid,
    sellerName: req.body.sellerName,
    category: req.body.category,
    storeAddress: req.body.storeAddress,
    storeAddressAddInfo: req.body.storeAddressAddInfo,
  }

  const accTypeChange = { accountType: 'seller' }
  const condition = { userUuid: req.userUuid }

  try {
    const dbRes = await SellerInfo.insertData('sellerInfo', newSellerInfo)
    const { accountType } = await UserManager.updateData('users', accTypeChange, condition)

    return res.status(200).json({dbRes, accountType})
  } catch (error) {
    if (error.code === '23505')
      return res.status(400).json({ error: 'This user already has seller info stored' })

    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = newSellerInfo
