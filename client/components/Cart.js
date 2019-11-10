import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.checkout = this.checkout.bind(this)
    // this.increment = this.increment.bind(this)
    // this.decrement = this.decrement.bind(this)
    this.remove = this.remove.bind(this)
    this.total = this.total.bind(this)
    this.totalItems = this.totalItems.bind(this)
    this.selector = this.selector.bind(this)
  }
  async componentDidMount() {
    //loops through local storage and pushes all items in array
    let potatoArray = []
    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
      let potato = JSON.parse(localStorage.getItem(keys[i]))
      potatoArray.push(potato)
    }
    //If user signed in
    if (this.props.user.id) {
      const userOrders = this.props.user.orders
      const currentOrder = userOrders[userOrders.length - 1]
      const {data} = await Axios.get(`/api/order_item/${currentOrder.id}`)
      console.log('data', data)
      let orderItems = data.map(orderItem => orderItem.product)
      console.log('orderItems', orderItems)
      orderItems = potatoArray.concat(orderItems)
      const map = {}
      const cart = []
      for (let i = 0; i < orderItems.length; i++) {
        if (!map[orderItems[i].id]) {
          cart.push(orderItems[i])
          map[orderItems[i].id] = orderItems[i]
        }
      }
      console.log('cart', cart)
      this.setState({products: cart})
    } else {
      this.setState({
        products: this.state.products.concat(potatoArray)
      })
    }
  }
  async checkout() {
    for (let i = 0; i < this.props.user.orders.length; i++) {
      if (!this.props.user.orders[i].complete) {
        this.props.user.orders[i].complete = true
      }
    }
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

  async selector(current) {}
  // async increment(current) {
  //   try {
  //     let specificPotato = await Axios.get(`/api/products/${current.id}`)
  //     if (current.quantity < specificPotato.data.quantity) {
  //       current.quantity += 1
  //       let quantity = JSON.parse(localStorage.getItem(current.id)).quantity
  //       current.quantity = quantity + 1
  //       localStorage.setItem(current.id, JSON.stringify(current))
  //       this.setState({})
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // decrement(current) {
  //   if (current.quantity > 1) {
  //     current.quantity -= 1
  //     let quantity = JSON.parse(localStorage.getItem(current.id)).quantity
  //     current.quantity = quantity - 1
  //     localStorage.setItem(current.id, JSON.stringify(current))
  //     this.setState({})
  //   }
  // }
  remove(id) {
    let copyArray = this.state.products.filter(current => {
      if (current.id !== id) {
        return current
      }
    })

    this.setState({products: copyArray})
    localStorage.removeItem(id)
  }
  total() {
    // let total = 0
    // for (let i = 0; i < this.state.products.length; i++) {
    //   let currentProduct = this.state.products[i].price
    //   currentProduct = currentProduct * this.state.products[i].quantity
    //   total += currentProduct
    // }
    // return total
  }
  totalItems() {
    // let total = 0
    // for (let i = 0; i < this.state.products.length; i++) {
    //   let currentProduct = this.state.products[i].quantity
    //   total += currentProduct
    // }
    // return total
  }

  render() {
    console.log('in render', this.state)
    return (
      <div className="cart-component-container">
        <div className="attributes">
          {/* best that we can do*/}
          <h4>Shopping Cart</h4>
          <h3>Name</h3>
          <h3>Origin</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
          <div />
        </div>
        {this.state.products.length !== 0 ? (
          this.state.products.map(current => {
            return (
              <div className="single-product" key={current.id}>
                <Link to={`/products/${current.id}`}>
                  <img className="cart-product-img" src={current.imageUrl} />
                </Link>
                <Link to={`/products/${current.id}`}>
                  <h3>{current.name}</h3>
                </Link>
                <p>{current.origin}</p>
                <p>{current.price / 100} USD</p>
                <p>{current.quantity}</p>
                <select>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                <div className="button">
                  <button type="submit" onClick={() => this.increment(current)}>
                    +
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      this.decrement(current)
                    }}
                  >
                    -
                  </button>
                  <button type="submit" onClick={() => this.remove(current.id)}>
                    Remove Item
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div id="empty-cart">
            <p>Cart is Empty</p>
          </div>
        )}
        <div className="checkout-button-container">
          <div className="checkout-button">
            <h3>TOTAL ITEMS: {this.totalItems()} </h3>
            <h3>TOTAL: {this.total() / 100} USD </h3>
            <button
              type="submit"
              disabled={!this.props.user.id}
              onClick={this.checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {user: state.user}
}
export default connect(mapStateToProps)(Cart)
