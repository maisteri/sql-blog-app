const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    username: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  }
)

module.exports = User
