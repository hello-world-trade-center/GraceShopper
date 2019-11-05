const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const specificUser = await User.findById(id)
    if (specificUser) {
      res.json(specificUser)
    } else {
      res.status(404).send('User does not exist')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/userId', async (req, res, next) => {
  try {
    const user = await User.findById(id)
    user.boughtItems.push(req.body)
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const specificUser = await User.findById(req.params.userId)
    const deletedUser = await specificUser.destroy()
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
