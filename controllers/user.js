const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')

const removePasswordHash = (response) => {
  const user = response.toJSON()
  delete user.passwordHash
  return user
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      attributes: { exclude: ['userId'] },
      model: Blog,
    },
    attributes: { exclude: ['passwordHash'] },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}
  const filter = req.query.read

  if (filter) {
    where = {
      read: filter,
    }
  }
  const userWithReadings = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'updatedAt', 'createdAt'] },
        through: {
          attributes: ['id', 'read'],
          where,
        },
      },
    ],
  })
  res.json(userWithReadings)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await User.create({ username, name, passwordHash })
  res.send(removePasswordHash(user))
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  if (user) {
    user.name = req.body.name
    const newUser = await user.save()
    res.json(removePasswordHash(newUser))
  } else {
    res.status(404).end()
  }
})

module.exports = router
