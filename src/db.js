let db = require('mysql')

let pool = db.createPool({
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'root',
  db: 'desarrollo'
})

module.exports = pool;