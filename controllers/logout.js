const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const sessions = await Session.findAll({
    where: {
      userId: req.decodedToken.id,
    },
  })
  console.log(JSON.stringify(sessions))
  sessions.forEach((session) => session.destroy())
  res.status(204).end()
})

module.exports = router
