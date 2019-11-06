import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    console.log('rops on component>>>', this.props)
    const potato = this.props.product
    return (
      <div key={potato.id}>
        <img src={potato.imageUrl} />
        <h3>{potato.name}</h3>
        <p>{potato.origin}</p>
        <p>{potato.description}</p>
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
