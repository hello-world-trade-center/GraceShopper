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
  try {
    const gotOrder = await Order.findByPk(req.params.orderId, {
      include: {
        model: Product
      }
    })
    console.log('this is an order', gotOrder.dataValues)
    const newProducts = []
    for (let i = 0; i < req.body.products.length; i++) {
      const product = req.body.products[i]
      product.orderId = gotOrder.id
      newProducts.push(product)
    }
    console.log('these are the products we want to add to order', newProducts)
    const updatedOrder = await gotOrder.update({
      ...gotOrder,
      products: newProducts
    })
    console.log('this is the updatedOrder', updatedOrder)
    res.status(201).json(updatedOrder)
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

// router.post('/:orderId', async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const order = await Order.findByPk(req.params.id)
//     const updatedOrder = await order.update({
//       ...order
//     })
//     res.send(updatedOrder)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
