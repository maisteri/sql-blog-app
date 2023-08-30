const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send(error)
  }

  if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({ error: error.errors.map((e) => e.message) })
  }

  next(error)
}

module.exports = errorHandler
