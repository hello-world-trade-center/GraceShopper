import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import Cartitem from './CartItem'
import {getCart, getCartItems, deleteCartItem} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.checkout = this.checkout.bind(this)
    this.remove = this.remove.bind(this)
    this.total = this.total.bind(this)
    this.totalItems = this.totalItems.bind(this)
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

      const cartitems = this.props.getCartItems(currentOrder.id)
      // const cart = this.props.getCart(currentOrder.id)

      console.log('props', this.props)
      console.log('cartitems', cartitems)

      //   const {data} = await Axios.get(`/api/order_item/${currentOrder.id}`)
      //   let orderItems = data.map(orderItem => {
      //     orderItem.product.amount = orderItem.amount
      //     return orderItem.product
      //   })
      //   orderItems = potatoArray.concat(orderItems)
      //   const map = {}
      //   orderItems = orderItems.filter(item => {
      //     if (!map[item.id]) {
      //       map[item.id] = item
      //       return map[item.id]
      //     }
      //   })
      //   console.log(orderItems)
      //   this.setState({products: orderItems})
      // } else {
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

  remove(id) {
    if (this.props.user) {
      this.props.deleteCartItem(id)
    } else {
      this.setState({products: copyArray})
      localStorage.removeItem(id)
    }
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
    console.log('props', this.props)
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
              <Cartitem
                key={current.id}
                current={current}
                remove={this.remove}
              />
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

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => {
      dispatch(getCart(id))
    },
    getCartItems: id => {
      dispatch(getCartItems(id))
    },
    deleteCartItem: id => {
      dispatch(deleteCartItem(id))
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
