import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'
import {addCartItem} from '../store/cart'
import Axios from 'axios'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async handleAddToCart() {
    const item = this.props.product
    if (this.props.user.id) {
      const userOrders = this.props.user.orders
      const currentOrder = userOrders[userOrders.length - 1]
      this.props.addCartItem(currentOrder.id, item)
    } else {
      try {
        this.props.addCartItem(0, item)
        //   const potato = await Axios.get(`/api/products/${itemId}`)
        //   potato.data.amount = 1
        //   localStorage.setItem(itemId, JSON.stringify(potato.data))
      } catch (error) {
        console.log(error)
      }
    }
    history.push('/cart')
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    const potato = this.props.product
    return (
      <div className="single-product-page">
        <div key={potato.id}>
          <img className="product-img" src={potato.imageUrl} />
        </div>

        <div className="single-product-page-info">
          <h3>{potato.name}</h3>
          <p>{potato.origin}</p>
          <p>{potato.description}</p>
          <p>{potato.price / 100} USD</p>
          {potato.quantity > 0 ? (
            <button onClick={this.handleAddToCart} type="submit">
              Add To Cart
            </button>
          ) : (
            <h3>Sold Out</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.singleProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getProduct(id)),
    addCartItem: (id, order) => dispatch(addCartItem(id, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
