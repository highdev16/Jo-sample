const Pool = require('pg').Pool
const sha256 = require('sha256');
const salt = '!%@#%asdg1613';
const pool = new Pool({
  user: 'developer',
  host: 'localhost',
  database: 'test',
  password: 'root',
  port: 5432,
})

const login = (request, response) => {
  const { username, password } = request.body

  pool.query('SELECT * FROM tblusers WHERE username = $1 AND password = $2', [username, sha256(password, salt)], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length == 0) {
      response.status(201).json({'error':'Login failed'})
    }
    response.status(200).json(results.rows[0])
  })
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM tblusers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tblusers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, email, password } = request.body

  pool.query('SELECT * FROM tblusers WHERE username = $1', [username], (error, results) => {
    if (results.rows.length > 0) {
      response.status(201).json({'error': 'Username exist'})
      return
    }

    pool.query('INSERT INTO tblusers (username, email, password) VALUES ($1, $2, $3)', [username, email, sha256(password, salt)], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send('User created')
    })    
  })


}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password } = request.body

  pool.query(
    'UPDATE tblusers SET username = $1, email = $2 WHERE id = $3', [username, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('User modified with ID: ${id}')
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM tblusers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('User deleted with ID: ${id}')
  })
}

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}