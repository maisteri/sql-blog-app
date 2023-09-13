const router = require('express').Router()
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}
  const filter = req.query.search

  if (filter) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${filter}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${filter}%`,
          },
        },
      ],
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.status(200).json(blogs)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    if (blog.userId === req.decodedToken.id) {
      await blog.destroy()
      res.status(204).json(blog)
    } else {
      res.status(403).end()
    }
  } else {
    res.status(404).end()
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id })
  return res.json(blog)
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.status(200).json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
