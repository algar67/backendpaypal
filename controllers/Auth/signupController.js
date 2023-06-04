const CryptoJS = require('crypto-js')
const { v4: uuidv4 } = require('uuid')
const { UserManager } = require('../../model/userModel')
const { PersonalInfo } = require('../../model/personalInfoModel')

const signupController = async (req, res) => {
  const userUuid = uuidv4()
  const { email, password, firstName } = req.body

  const dbUserByEmail = await UserManager.getUserByEmail(email)
  if (dbUserByEmail?.email === email) return res.status(400).json('Email already in use').end()

  const encryptedPassword = CryptoJS.MD5(password).toString()

  const newUser = { userUuid, email, encryptedPassword, firstName }

  try {
    await UserManager.insertNewUser(newUser)
  } catch (error) {
    return res.status(400).json(error.toString())
  }

  const newPersonalInfo = {
    userUuid,
    lastName: req.body.lastName,
    phone: req.body.phone,
    gender: req.body.gender,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    birthDate: req.body.birthDate,
    timeZone: req.body.timeZone,
  }

  try {
    await PersonalInfo.insertData('personalInfo', newPersonalInfo)
  } catch (error) {
    try {
      await UserManager.deleteFrom('users', 'userUuid', userUuid)
    } catch (error) {
      return res.status(400).json(error.toString())
    }
    return res.status(400).json(error.toString())
  }

  // const creationTime = DatesHelp.getNow()

  // insert into user statistics

  res.status(201).json({ message: 'User created successfully' })
}

module.exports = signupController
