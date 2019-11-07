const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'origin', 'imageUrl']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const specificProduct = await Product.findByPk(id)
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
    let product = await Product.findByPk(req.params.productId)

    const newInventory = product.quantity - req.body.quantity

    const updatedProduct = await product.update({
      ...product,
      quantity: newInventory
    })

    res.status(201).json(updatedProduct)
  } catch (error) {
    console.error(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body)
//     res.status(201).json(newProduct)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:productId', async (req, res, next) => {
//   try {
//     const specificProduct = await Product.findByPk(req.params.productId)
//     const deletedProduct = await specificProduct.destroy()

//     res.status(204).json(deletedProduct)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
