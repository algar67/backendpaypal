const { Client } = require('pg')
require('dotenv').config()

/**
 * create connection to SQL database
 * 1- define db parameters (user, port, password, ...)
 * 2- create a new connection using "new Client()" from pg library
 * 3- start the connection with the ".connect()" method from the new client
 */
const dbConnect = async (table) => {
  const newClient = new Client(chooseDb(table))
  newClient.connect()
  return newClient
}

const chooseDb = (table) => {
  if (table === 'paymentMethods') {
    return {
      host: process.env.PG_HOST_2,
      port: process.env.PG_PORT_2,
      user: process.env.PG_USER_2,
      password: process.env.PG_PASSWORD_2,
      database: process.env.PG_DATABASE_2,
      // ssl: { require: true, rejectUnauthorized: false },
    }
  }
  return {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    // ssl: { require: true, rejectUnauthorized: false },
  }
}

module.exports = dbConnect
