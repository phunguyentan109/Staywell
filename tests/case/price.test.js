/* eslint-disable no-undef */
const chaiHttp = require('chai-http')
const chai = require('chai')
const { clear } = require('../util')
const server = require('../../index')
const mockData = require('../sample')

// Assertion
chai.should()
chai.use(chaiHttp)

const { request: req } = chai
let token
const mockPrice = mockData.MockPrice.Price
const owner = mockData.User.Owner

describe('PRICE', () => {
  before(() => {
    return new Promise((resolve) => {
      req(server)
        .post('/api/user/login')
        .send(owner)
        .end((err, res) => {
          token = res.body.token
          console.log('\n', 'token ', token)
          resolve()
        })
    })
  })

  describe('Positive', () => {
    console.log('token 1 ', token)
    it('It should create a price: /api/price', (done) => {
      req(server)
        .post('/api/price')
        .auth(token, { type: 'bearer' })
        .send(mockPrice)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('type').eql(mockPrice.type)
          res.body.should.have.property('electric').eql(mockPrice.electric)
          res.body.should.have.property('wifi').eql(mockPrice.wifi)
          res.body.should.have.property('water').eql(mockPrice.water)
          res.body.should.have.property('living').eql(mockPrice.living)
          res.body.should.have.property('extra').eql(mockPrice.extra)
          res.body.should.have.property('room_id')
          done()
        })
    })
  
    it('It should get all price: /api/price', (done) => {
      req(server)
        .get('/api/price')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.not.be.eq(0)
          done()
        })
    })
  })

  describe('Negative', () => {
    it('It should return status 404 when request wrong route: /api/prices', (done) => {
      req(server)
        .get('/api/prices')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  after('Remove mockup data', () => {
    console.log('Cleaning... ')
    // await clear('Price', 'type', mockPrice.type)
    console.log('===========================', '\n')
  })
})