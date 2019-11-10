const router = require('express').Router()
const {Order, OrderItem, Product, User} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const item = await OrderItem.create({
      orderId: req.body.orderId,
      productId: req.body.productId
    })
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

// .get('/:cartId', (req, res, next) => {
//     Order.find({
//       where: { id: req.params.cartId },
//       include: [{model: OrderItem, include: [Product]}]
//     })
//     .then(foundOrder => res.json(foundOrder))
//     .catch(next)

module.exports = router
