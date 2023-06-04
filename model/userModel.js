const camelize = require('camelize')
const minify = require('pg-minify')
const dbConnect = require('./db/newClient')
const QueryModel = require('./queryModel')

class User {
  constructor({
    userId = null,
    userUuid = null,
    email = null,
    password = null,
    firstName = null,
    accountType = null,
    funds = null,
  }) {
    this.userId = userId
    this.userUuid = userUuid
    this.email = email
    this.password = password
    this.firstName = firstName
    this.accountType = accountType
    this.funds = funds
  }
}

const castUser = (user) => {
  user = camelize(user)
  return new User(user)
}

class UserManager extends QueryModel {
  static insertNewUser = async ({ userUuid, email, encryptedPassword, firstName }) => {
    const client = await dbConnect()

    try {
      const dbRes = await client.query(
        'INSERT INTO users (user_uuid, email, password, first_name) VALUES (($1), ($2), ($3), ($4)) RETURNING *',
        [userUuid, email, encryptedPassword, firstName],
      )

      const user = castUser(dbRes.rows[0])

      return user
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error inserting user in database')
    } finally {
      client.end()
    }
  }

  static getUserByUuid = async (userUuid) => {
    const client = await dbConnect()

    const query = `SELECT * FROM users 
      WHERE user_uuid = ($1)`

    try {
      const dbRes = await client.query(minify(query), [userUuid])

      if (dbRes.rows.length === 0) return

      const user = castUser(dbRes.rows[0])

      return user
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error retrieving users from database')
    } finally {
      client.end()
    }
  }

  static getUserByEmail = async (email) => {
    const client = await dbConnect()

    try {
      const dbRes = await client.query('SELECT * FROM users WHERE email = ($1)', [email])

      if (dbRes.rows.length === 0) return

      const user = castUser(dbRes.rows[0])

      return user
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error retrieving users from database')
    } finally {
      client.end()
    }
  }
}

module.exports = { User, UserManager }
