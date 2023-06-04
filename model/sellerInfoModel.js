const QueryModel = require("./queryModel")

class SellerInfo extends QueryModel {
  constructor({
    sellerInfoId = null,
    userUuid = null,
    sellerName = null,
    category = null,
    storeAddress = null,
    storeAddressAddInfo = null,
  }) {
    super()
    this.sellerInfoId = sellerInfoId
    this.userUuid = userUuid
    this.sellerName = sellerName
    this.category = category
    this.storeAddress = storeAddress
    this.storeAddressAddInfo = storeAddressAddInfo
  }
}

module.exports = { SellerInfo }
