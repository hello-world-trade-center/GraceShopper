const router = require('express').Router()
const {Order, Product, User, OrderItem} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: OrderItem, include: [Product]}]
    })
    console.log('order in ', order)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body, {
      include: {
        model: OrderItem
      }
    })
    res.status(201).send(newOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/checkout/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    order.update({
      complete: true,
      total: req.body.total
    })
    const newOrder = await Order.create({
      userId: order.userId
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
