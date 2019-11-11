import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import Cartitem from './CartItem'
import {deleteCartItem} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.checkout = this.checkout.bind(this)
    this.total = this.total.bind(this)
    this.totalItems = this.totalItems.bind(this)
  }

  async checkout() {
    // for (let i = 0; i < this.props.user.orders.length; i++) {
    //   if (!this.props.user.orders[i].complete) {
    //     this.props.user.orders[i].complete = true
    //   }
    // }
    // try {
    //   for (let i = 0; i < this.state.products.length; i++) {
    //     const potatoId = this.state.products[i].id
    //     const quantity = JSON.parse(localStorage.getItem(potatoId)).quantity
    //     const returnPotato = await Axios.post(`/api/products/${potatoId}`, {
    //       quantity
    //     })
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
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
    deleteCartItem: (orderId, productId) =>
      dispatch(deleteCartItem(orderId, productId))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
