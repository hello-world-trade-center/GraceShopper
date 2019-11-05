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
        id: 1,
        email: codysEmail,
        password: '1234',
        boughtItems: []
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

    it('Creates a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          name: 'Jon',
          email: 'jon@email.com',
          password: '1234'
        })
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Jon')
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
