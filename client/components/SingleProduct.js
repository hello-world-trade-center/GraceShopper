import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'
import Axios from 'axios'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async handleAddToCart() {
    const itemId = this.props.product.id
    try {
      const potato = await Axios.get(`/api/products/${itemId}`)
      potato.data.quantity = 1
      localStorage.setItem(itemId, JSON.stringify(potato.data))
    } catch (error) {
      console.log(error)
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

          <button onClick={this.handleAddToCart} type="submit">
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
