// const dbPmConnect = require('./db/newPMClient')
const minify = require('pg-minify')
const dbConnect = require('./db/newClient')
const camelize = require('camelize')
const { snakizeString } = require('../helpers/casing')
const snakeize = require('snakeize')

class QueryModel {
  /**
   * Query for a row in a table by column
   * @param {string} table - SQL table name
   * @param {string} column - column name
   * @param {string} value - column value
   * @returns {undefined | dbData} returns undefined if query returns nothing
   */
  static async selectBy(table, column, value) {
    const client = await dbConnect(table)

    const tbl = snakizeString(table)
    const col = snakizeString(column)

    const query = `SELECT * FROM ${tbl}
        WHERE ${col} = ($1)`

    try {
      const { rows } = await client.query(minify(query), [value])

      if (rows.length === 0) return

      const dbData = camelize(rows)
      return dbData
    } catch (err) {
      throw new Error('Error retrieving data from database')
    } finally {
      client.end()
    }
  }

  /**
   * Insert multiple
   * @param {string} table - destination table
   * @param {object} newData - columns and values to be inserted
   * @returns {dbData}
   */
  static async insertData(table, newData) {
    const client = await dbConnect(table)

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newData)).toString()
    const values = Object.values(newData)

    const positions = this.parameterPositions(values)

    const query = `INSERT INTO ${tbl} (${keys}) 
      VALUES (${positions}) 
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)
      const dbData = camelize(rows)

      return dbData
    } catch (err) {
      console.error('Error executing query:', err)
      throw err
    } finally {
      client.end()
    }
  }
  /**
   * Update multiple fields in a single row
   * @param {string} table - UPDATE
   * @param {obj} newData - SET
   * @param {obj} condition - WHERE
   * @returns {obj} updated row
   */
  static async updateData(table, newData, condition) {
    const client = await dbConnect(table)

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newData))
    const values = Object.values(newData)
    const conditSnake = snakeize(condition)
    const conditCol = Object.keys(conditSnake)

    const columnsAndValues = this.columnsAndValues(keys)

    const query = `UPDATE ${tbl} 
      SET ${columnsAndValues}
      WHERE ${conditCol} = '${conditSnake[conditCol]}'
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)
      if (rows.length === 0) throw new Error('No data found')

      const dbData = camelize(rows)

      return dbData
    } catch (err) {
      console.error('Error executing query:', err)
      throw err
    } finally {
      client.end()
    }
  }

  static async deleteFrom(table, column, value) {
    const client = await dbConnect(table)

    const tbl = snakizeString(table)
    const col = snakizeString(column)

    const query = `DELETE FROM ${tbl}
        WHERE ${col} = ($1) 
        RETURNING *`

    try {
      const { rows } = await client.query(minify(query), [value])

      if (rows.length === 0) return

      const dbData = camelize(rows)
      return dbData
    } catch (err) {console.log('deleting', err)
      throw new Error('Error deleting from database')
    } finally {
      client.end()
    }
  }

  static parameterPositions(arr) {
    let finalString = ''

    for (let i = 1; i <= arr.length; i++) {
      let temp = `($${i})`
      finalString += temp

      if (i !== arr.length) {
        finalString += ', '
      }
    }

    return finalString
  }

  static columnsAndValues(arr) {
    let finalString = ''

    for (let i = 1; i <= arr.length; i++) {
      let temp = `($${i})`
      finalString += arr[i - 1] + ' = ' + temp

      if (i !== arr.length) {
        finalString += ', '
      }
    }

    return finalString
  }

  static castData(data) {
    const dt = camelize(data)
    return new constructor(dt)
  }
}

module.exports = QueryModel
