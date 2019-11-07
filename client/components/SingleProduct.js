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
    // event.preventDefault()
    const itemId = this.props.product.id
    try {
      const potato = await Axios.get(`/api/products/${itemId}`)
      potato.data.quantity = 1
      localStorage.setItem(itemId, JSON.stringify(potato.data))
      console.log('potato data', potato.data)
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
      <div className="single-product" key={potato.id}>
        <img className="product-img" src={potato.imageUrl} />
        <h3>{potato.name}</h3>
        <p>{potato.origin}</p>
        <p>{potato.description}</p>
        <p>{'$' + potato.price}</p>

        <button onClick={this.handleAddToCart} type="submit">
          Add To Cart
        </button>
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
