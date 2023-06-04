class Casing {
  static snakizeString = (str) => {
    const regex = /[A-Z]/g
    const replace = (letter) => `_${letter.toLowerCase()}`
    return str.replace(regex, replace)
  }

  static camelizeString = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

module.exports = Casing
