const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products route', () => {
    beforeEach(() => {
      return Product.create({
        name: 'potato1',
        price: 4,
        description: 'really great potato',
        origin: 'France',
        inventory: 99,
        rating: 4
      })
    })

    it('get all potatoes', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('potato1')
    })

    it('gets one potato', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('potato1')
    })

    it('decrements the inventory by desired amount from user', async () => {
      const res = await request(app)
        .post('/api/products/1')
        .send({quantity: 4})
        .expect(201)
      expect(res.body.inventory).to.be.equal(95)
    })

    it('creates a new potato', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'potato2',
          price: 3,
          description: 'ok potato',
          origin: 'USA',
          inventory: 50,
          rating: 3
        })
        .expect(201)
      expect(res.body.name).to.be.equal('potato2')
    })

    it('deletes a product', async () => {
      const res = await request(app)
        .delete('/api/products/1')
        .expect(204)

      const isPotato1There = await Product.findByPk(1)

      expect(isPotato1There).to.equal(null)
    })
  })
})
