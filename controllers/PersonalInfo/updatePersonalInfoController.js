const { PersonalInfo } = require("../../model/personalInfoModel")

const updatePersonalInfoController = async (req, res) => {
  const toUpdate = req.body
  const condition = { userUuid: req.userUuid }

  try {
    const dbPersonalInfo = await PersonalInfo.updateData('personalInfo', toUpdate, condition)
    return res.status(200).json(dbPersonalInfo)
  } catch (error) {
    console.log("",error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = updatePersonalInfoController
