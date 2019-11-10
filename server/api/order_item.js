const router = require('express').Router()
const {Order, OrderItem, Product, User} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const item = await OrderItem.create({
      quantity: 1,
      orderId: req.body.orderId,
      productId: req.body.productId
    })
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//User adds a product to the cart
// .post('/', (req, res, next) => {
//     OrderItem.create({
//       size: req.body.orderItem.size,
//       quantity: req.body.orderItem.quantity,
//       order_id: req.session.cart.id,
//       product_id: req.body.product_id
//     }, {include: [Order, Product]})
//     .then(createdOrderItem => {
//       console.log('This is the newly created order item: ', createdOrderItem)
//       if (!req.session.cart.order_items) {
//         req.session.cart.order_items = [createdOrderItem] //If this is the first item in the cart, init the cart
//       }
//       else {
//         req.session.cart.order_items.push(createdOrderItem) //Otherwise add item to existing cart
//       }
//       res.send(req.session.cart)})
//     .catch(next)
//   })

module.exports = router
