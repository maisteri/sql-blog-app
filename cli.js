require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(
  'postgres://postgres:DHruQhMly4rRwBP@dawn-paper-3606-db.flycast:5432'
)

const main = async () => {
  try {
    await sequelize.authenticate()
    const notes = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    })
    console.log(notes)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
