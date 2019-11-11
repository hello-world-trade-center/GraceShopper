const router = require('express').Router()
const {Order, OrderItem, Product, User} = require('../db/models')

router.post('/:orderId', async (req, res, next) => {
  try {
    let item = await OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.body.productId
      }
    })

    if (!item) {
      item = await OrderItem.create({
        orderId: req.params.orderId,
        productId: req.body.productId
      })
    }
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//All items in an order are rendered to the cart
router.get('/:orderId', async (req, res, next) => {
  try {
    const ordersInCart = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId
      },
      include: {model: Product}
    })
    res.json(ordersInCart)
  } catch (error) {
    next(error)
  }
})

// router.post('/:orderId', async (req, res, next) => {
//   try {
//     const order = await OrderItem.findByPk(req.params.orderId)
//     order.update({...order, amount: req.body.amount})
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

router.delete('/', async (req, res, next) => {
  try {
    const order = await OrderItem.findByPk(req.body)
    order.destroy()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
