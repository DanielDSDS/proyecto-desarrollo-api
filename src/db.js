const { Pool } = require('pg')

let pool = new Pool({
  host: 'ec2-34-193-112-164.compute-1.amazonaws.com',
  user: 'ppqmjqipklhxxb',
  port: 5432,
  password: '491cbffa0b59d9116d8b7ef9e550a06defa22fa049cff1838c79f7d561c59c1d',
  database: 'dcifedhpqemqrt',
  ssl: false,
  ssl: {
    rejectUnauthorized: false,
  }
})

module.exports = pool;