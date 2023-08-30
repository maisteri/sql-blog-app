require('dotenv').config()

module.exports = {
  DATABASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'postgres://xibzqizs:A1dLVCvwhmqVJbWPzDuR3mj5q8H9Y1tO@snuffleupagus.db.elephantsql.com/xibzqizs'
      : 'postgres://postgres:DHruQhMly4rRwBP@dawn-paper-3606-db.flycast:5432',
  PORT: process.env.PORT || 3001,
  SECRET: 'salainen',
}

// 'postgres://dawn_paper_3606:YXRaTVgoLfvbE3a@localhost:5432/dawn_paper_3606?sslmode=disable'
