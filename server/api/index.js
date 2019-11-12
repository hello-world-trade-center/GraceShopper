const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/order_item', require('./order_item'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
