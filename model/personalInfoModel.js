const QueryModel = require("./queryModel")

class PersonalInfo extends QueryModel {
  constructor({
    personalInfoId = null,
    userUuid = null,
    lastName = null,
    phone = null,
    birthDate = null,
    gender = null,
    address = null,
    city = null,
    state = null,
    country = null,
    timeZone = null,
  }) {
    super()
    this.personalInfoId = personalInfoId
    this.userUuid = userUuid
    this.lastName = lastName
    this.phone = phone
    this.birthDate = birthDate
    this.birthDate = birthDate
    this.gender = gender
    this.address = address
    this.city = city
    this.city = city
    this.state = state
    this.country = country
    this.timeZone = timeZone
  }
}

module.exports = { PersonalInfo }
