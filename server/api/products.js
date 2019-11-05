const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const specificProduct = await Product.findById(id)
    if (specificProduct) {
      res.json(specificProduct)
    } else {
      res.status(404).send('Something went wrong :/')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    product.inventory -= 1
    res.json(product)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const specificProduct = await Product.findById(req.params.productId)
    const deletedProduct = await specificProduct.destroy()

    res.json(deletedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
