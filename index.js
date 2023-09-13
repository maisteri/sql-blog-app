const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const errorHandler = require('./util/error')

const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/author')
const readinglistRouter = require('./controllers/readinglist')

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglist', readinglistRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
