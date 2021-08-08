let Mysqli = require('mysqli')

let db = new Mysqli({
  host: '',
  post: 3306,
  user: 'root',
  passwd: '',
  charset: '',
  db: ''
})

export default db