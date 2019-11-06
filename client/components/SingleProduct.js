import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
      // show:true
    }
    this.incrementItem = this.incrementItem.bind(this)
    this.decrementItem = this.decrementItem.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.customAmount = this.customAmount.bind(this)
  }

  incrementItem() {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  decrementItem() {
    if (this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1
      })
    }
  }

  handleAddToCart() {
    // <Link to = {//cart} component = {this.state} />
  }

  customAmount(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    console.log(this.state.quantity)
    const potato = this.props.product
    return (
      <div key={potato.id}>
        <img className="product-img" src={potato.imageUrl} />
        <h3>{potato.name}</h3>
        <p>{potato.origin}</p>
        <p>{potato.description}</p>
        <p>{'$' + potato.price}</p>
        <label htmlFor="quantity">{this.state.quantity}</label>
        <button onClick={this.incrementItem}>+</button>
        <button onClick={this.decrementItem}>-</button>

        <button onClick={this.handleSubmit} type="submit">
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
