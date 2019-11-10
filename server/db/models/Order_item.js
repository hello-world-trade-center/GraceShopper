const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order_item', {
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})
module.exports = OrderItem
