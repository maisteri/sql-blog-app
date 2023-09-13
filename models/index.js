const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'myReaders' })
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog,
  User,
  Readinglist,
}
