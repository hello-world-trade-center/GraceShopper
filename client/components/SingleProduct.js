import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'
import {addCartItem} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async handleAddToCart() {
    const item = this.props.product

    if (this.props.user.id) {
      this.props.addCartItem(this.props.cart.id, item, 1)
    } else {
      this.props.addCartItem(0, item, 1)
    }
    history.push('/cart')
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    const potato = this.props.product
    console.log('TCL: SingleProduct -> render -> potato', potato)

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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getProduct(id)),
    addCartItem: (id, order) => dispatch(addCartItem(id, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
