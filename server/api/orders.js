const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [Product, User]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId', async (req, res, next) => {
  // console.log(req.body)
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: {
        model: Product
      }
    })

    const newProducts = []
    for (let i = 0; i < req.body.products.length; i++) {
      newProducts.push(req.body.products[i])
    }

    const updatedOrder = await order.update({...order, products: newProducts})
    // order.products.push(req.body.products)
    // console.log('orders in route', order)
    res.status(201).send(updatedOrder)
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
    res.status(201).send(newOrder)
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
    res.send(updatedOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
