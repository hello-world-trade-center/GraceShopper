/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        name: 'Cody',
        email: codysEmail,
        password: '1234',
        boughtItems: ['potato1']
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('Gets a single user', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Cody')
    })

    it('adds to user items', async () => {
      const res = await request(app)
        .post('/api/users/1')
        .send(['potato2'])
        .expect(200)

      expect(res.body.boughtItems.includes('potato1')).to.be.equal(true)
      expect(res.body.boughtItems.includes('potato2')).to.be.equal(true)
    })

    it('deletes a user', async () => {
      const res = await request(app)
        .delete('/api/users/1')
        .expect(204)

      const isCodyThere = await User.findByPk(1)
      expect(isCodyThere).to.equal(null)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
