const QueryModel = require('./queryModel')

class Transaction extends QueryModel {
  constructor(
    transactionId = null,
    transactionUuid = null,
    sellerUuid = null,
    buyerUuid = null,
    paymentMethodUuid = null,
    totalAmount = null,
    userCompleted = null,
    wentThrough = null,
    transactionTime = null,
    geolocation = null,
  ) {
    this.transactionId = transactionId
    this.transactionUuid = transactionUuid
    this.sellerUuid = sellerUuid
    this.buyerUuid = buyerUuid
    this.paymentMethodUuid = paymentMethodUuid
    this.totalAmount = totalAmount
    this.userCompleted = userCompleted
    this.wentThrough = wentThrough
    this.transactionTime = transactionTime
    this.geolocation = geolocation
  }
}

module.exports = Transaction
