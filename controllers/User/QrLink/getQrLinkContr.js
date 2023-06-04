const QrLink = require('../../../model/qrLinkModel')

const getUser = async (req, res) => {
  const linkSlug = req.params.slug

  try {
    const dbQrLink = await QrLink.selectBy('qrLinks', 'linkSlug', linkSlug)

    if (!dbQrLink) return res.status(404).json({ error: 'Not found' })

    return res.status(200).json(dbQrLink)
  } catch (error) {
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = getUser
