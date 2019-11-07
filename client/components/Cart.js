import React from 'react'
import Axios from 'axios'

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
    for (let i = 1; i <= localStorage.length; i++) {
      let potato = JSON.parse(localStorage.getItem(i))
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
    current.quantity -= 1
    let quantity = JSON.parse(localStorage.getItem(current.id)).quantity
    current.quantity = quantity - 1
    localStorage.setItem(current.id, JSON.stringify(current))
    this.setState({})
  }

  render() {
    return (
      <div>
        {this.state.products.length != 0
          ? this.state.products.map(current => {
              return (
                <div key={current.id}>
                  <img className="product-img" src={current.imageUrl} />
                  <h3>{current.name}</h3>
                  <p>{current.origin}</p>
                  <p>{current.price} USD</p>
                  <p>{current.quantity}</p>
                  <button onClick={event => this.increment(current)}>+</button>
                  <button
                    onClick={event => {
                      this.decrement(current)
                    }}
                  >
                    -
                  </button>
                </div>
              )
            })
          : null}
        <button onClick={this.checkout} type="checkout">
          Checkout
        </button>
      </div>
    )
  }
}

export default Cart
