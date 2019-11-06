import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <div key={product.id} className="product">
              <img src={product.imageUrl} />
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>{product.origin}</p>
              <p>{product.price}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
