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
    console.error(err)
  }
})
