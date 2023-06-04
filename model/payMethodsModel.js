const QueryModel = require("./queryModel")

class PayMethod extends QueryModel {
  constructor(
    payMethodId = null,
    paymentMethodUuid = null,
    userUuid = null,
    cardNumber = null,
    cardOwnerName = null,
  ) {
    this.payMethodId = payMethodId;
    this.paymentMethodUuid = paymentMethodUuid;
    this.userUuid = userUuid;
    this.cardNumber = cardNumber;
    this.cardOwnerName = cardOwnerName;
  }
}

module.exports = PayMethod;
