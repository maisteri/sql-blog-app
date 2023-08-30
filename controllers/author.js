const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    group: ['author'],
    order: [['likes', 'DESC']],
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('*')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
  })

  res.json(blogs)
})

module.exports = router
