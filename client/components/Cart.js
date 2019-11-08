import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.checkout = this.checkout.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  componentDidMount() {
    let potatoArray = []
    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
      let potato = JSON.parse(localStorage.getItem(keys[i]))
      potatoArray.push(potato)
    }
    this.setState({
      products: this.state.products.concat(potatoArray)
    })
  }

  async checkout() {
    try {
      for (let i = 0; i < this.state.products.length; i++) {
        const potatoId = this.state.products[i].id
        const quantity = JSON.parse(localStorage.getItem(potatoId)).quantity
        const returnPotato = await Axios.post(`/api/products/${potatoId}`, {
          quantity
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  increment(current) {
    current.quantity += 1
    let quantity = JSON.parse(localStorage.getItem(current.id)).quantity
    current.quantity = quantity + 1
    localStorage.setItem(current.id, JSON.stringify(current))
    this.setState({})
  }

  decrement(current) {
    if (current.quantity > 0) {
      current.quantity -= 1
      let quantity = JSON.parse(localStorage.getItem(current.id)).quantity
      current.quantity = quantity - 1
      localStorage.setItem(current.id, JSON.stringify(current))
      this.setState({})
    }
  }

  render() {
    if (this.state.products.length === 0) {
      return (
        <div id="empty-cart">
          <p>Cart is Empty</p>
        </div>
      )
    } else {
      return (
        <div className="cart-component-container">
          {this.state.products.length != 0
            ? this.state.products.map(current => {
                return (
                  <div className="single-product" key={current.id}>
                    <Link to={`/products/${current.id}`}>
                      <img
                        className="cart-product-img"
                        src={current.imageUrl}
                      />
                    </Link>
                    <Link to={`/products/${current.id}`}>
                      <h3>{current.name}</h3>
                    </Link>
                    <p>{current.origin}</p>
                    <p>{current.price / 100} USD</p>
                    <p>{current.quantity}</p>
                    <div className="button">
                      <button onClick={event => this.increment(current)}>
                        +
                      </button>
                      <button
                        onClick={event => {
                          this.decrement(current)
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                )
              })
            : null}
          <div className="checkout-button">
            <button onClick={this.checkout} type="checkout">
              Checkout
            </button>
          </div>
        </div>
      )
    }
  }
}

export default Cart
