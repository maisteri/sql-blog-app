const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

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
