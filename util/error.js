const errorHandler = (error, request, response, next) => {
  console.error('Error: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send(error)
  }

  if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({ error: error.errors.map((e) => e.message) })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler
