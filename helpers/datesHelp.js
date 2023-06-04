class DatesHelp {
  static getNow = () => {
    const today = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return today.toLocaleString('en-US', options)
  }
}

module.exports = DatesHelp
