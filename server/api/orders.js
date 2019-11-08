const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Product
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body, {
      include: {
        model: Product
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const updatedOrder = await order.update({
      ...order,
      complete: true
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
