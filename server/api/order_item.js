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
    } else {
      item = await item.update({
        amount: req.body.amount
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

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const order = await OrderItem.destroy({
      where: {
        productId: req.params.productId,
        id: req.params.orderId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
