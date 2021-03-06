import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Cartitem from './CartItem'
import history from '../history'
import Checkout from './StripeCheckout'
import {addCartItem, deleteCartItem, clearCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      PromoCode: 'mrpotato',
      Entry: ' ',
      ApplyPromo: false
    }

    this.checkout = this.checkout.bind(this)
    this.total = this.total.bind(this)
    this.totalItems = this.totalItems.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    event.preventDefault()
    if (this.state.Entry === this.state.PromoCode) {
      this.setState({
        ApplyPromo: true
      })
    }
  }

  handleChange(event) {
    this.setState({
      Entry: event.target.value
    })
  }

  async checkout() {
    const order = this.props.cart

    const completedOrder = await Axios.post(
      `/api/orders/checkout/${order.id}`,
      {
        total: this.total(true)
      }
    )
    const userInfo = await Axios.get(`/api/users/${completedOrder.data.userId}`)
    localStorage.setItem('completedCart', JSON.stringify(completedOrder.data))
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    this.props.clearCart()
    history.push(`/checkout/${completedOrder.data.id}`)
  }

  total(db) {
    let total = 0
    const items = this.props.cart.order_items
    if (!items.length) return 0
    for (let i = 0; i < items.length; i++) {
      let currentProduct = items[i].product
      let productPrice = currentProduct.price * items[i].amount
      total += productPrice
    }
    if (!db) {
      if (this.state.ApplyPromo) {
        return Math.floor(total * 0.85)
      } else {
        return total
      }
    } else if (this.state.ApplyPromo) {
      return Math.floor(total * 0.85)
    } else {
      return total
    }
  }
  totalItems() {
    let total = 0
    const items = this.props.cart.order_items
    for (let i = 0; i < items.length; i++) {
      total += Number(items[i].amount)
    }
    return total
  }

  render() {
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
        {this.props.cart.order_items.length !== 0 ? (
          this.props.cart.order_items.map(current => {
            return (
              <Cartitem
                key={current.product.id}
                current={current}
                remove={this.props.deleteCartItem}
                addItem={this.props.addCartItem}
              />
            )
          })
        ) : (
          <div id="empty-cart">
            <p>Cart is Empty</p>
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Promo"> PromoCode</label>
          <input onChange={this.handleChange} name="Promo" type="text" />
          <button disabled={this.state.ApplyPromo}>Submit</button>
        </form>

        <div className="checkout-container">
          <h3>TOTAL ITEMS: {this.totalItems()} </h3>
          <h3>TOTAL: {this.total() / 100} USD </h3>
        </div>

        {this.props.user.id ? (
          <Checkout
            name="Checkout"
            description="Luxury Potatoes"
            amount={this.total() / 100}
            checkout={this.checkout}
          />
        ) : (
          <Link to="/login">
            <h3 className="cart_login">Log in to Checkout</h3>
          </Link>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCartItem: (orderId, productId) =>
      dispatch(deleteCartItem(orderId, productId)),
    addCartItem: (orderId, productId, qty) =>
      dispatch(addCartItem(orderId, productId, qty)),
    clearCart: () => dispatch(clearCart())
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
