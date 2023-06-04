const QueryModel = require('./queryModel')

class QrLink extends QueryModel {
  constructor({
    qrLinkId = null,
    sellerUuid = null,
    checkoutType = null,
    totalAmount = null,
    linkSlug = null,
  }) {
    this.qrLinkId = qrLinkId
    this.sellerUuid = sellerUuid
    this.checkoutType = checkoutType
    this.totalAmount = totalAmount
    this.linkSlug = linkSlug
  }
}

module.exports = QrLink
