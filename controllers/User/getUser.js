const { UserManager } = require('../../model/userModel')

const getUser = async (req, res) => {
  const userUuid = req.userUuid

  try {
    const dbRes = await UserManager.getUserByUuid(userUuid)

    if (!dbRes) return res.status(400).json({ error: 'No user found' })

    return res.status(200).json(dbRes)
  } catch (error) {
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = getUser
