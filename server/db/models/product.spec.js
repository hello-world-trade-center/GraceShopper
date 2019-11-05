const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let potato

    beforeEach(async () => {
      potato = await Product.create({
        name: 'luxury potato',
        price: 12.34,
        description: 'delicious',
        rating: 4
      })
    })

    describe('correctInfo', () => {
      it('returns the correct name', () => {
        expect(potato.name).to.be.equal('luxury potato')
      })

      it('returns the correct email', () => {
        expect(potato.price).to.be.equal(12.34)
      })

      it('returns the correct description', () => {
        expect(potato.description).to.be.equal('delicious')
      })

      it('returns the correct rating', () => {
        expect(potato.rating).to.be.equal(4)
      })
    })
  })
})
