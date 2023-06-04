const validateTokenController = async (req, res) => {
  return res.status(200).json({
    error: 'Token validated',
  })
}

module.exports = validateTokenController
