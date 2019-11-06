const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  data: {
    type: Sequelize.STRING
  }
})

module.exports = OrderProduct
