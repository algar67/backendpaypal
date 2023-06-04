const { PersonalInfo } = require('../../model/personalInfoModel')

const getPersonalInfo = async (req, res) => {
  const userUuid = req.userUuid

  try {
    const dbRes = await PersonalInfo.selectBy('personalInfo', 'userUuid', userUuid)

    if (!dbRes) {
      return res.status(400).json({
        error: 'No user found',
      })
    }

    return res.status(200).json(dbRes)
  } catch (error) {
    console.log(error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = getPersonalInfo
