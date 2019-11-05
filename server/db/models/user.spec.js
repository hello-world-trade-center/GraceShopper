/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        name: 'Cody',
        address: '1234 elm st',
        city: 'New York',
        zipCode: '10020',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
    describe('correctInfo', () => {
      it('returns the correct address', () => {
        expect(cody.address).to.be.equal('1234 elm st')
      })

      it('returns the correct email', () => {
        expect(cody.email).to.be.equal('cody@puppybook.com')
      })

      it('returns the correct zipCode', () => {
        expect(cody.zipCode).to.be.equal('10020')
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
