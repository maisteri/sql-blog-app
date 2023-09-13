const router = require('express').Router()
const Readinglist = require('../models/readinglist')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  console.log(req.body)
  const entry = await Readinglist.create(req.body)
  res.json(entry)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const entry = await Readinglist.findByPk(req.params.id)
  console.log(req.decodedToken)
  if (entry) {
    if (entry.userId === req.decodedToken.id) {
      console.log(JSON.stringify(entry))
      entry.read = req.body.read
      const modifiedEntry = await entry.save()
      res.json(modifiedEntry)
    } else {
      res.status(403).end()
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router
