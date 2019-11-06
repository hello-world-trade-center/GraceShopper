import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const AllProducts = props => {
  return (
    <div>
      {props.products.map(product => {
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

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  }
}

export default connect(mapStateToProps)(AllProducts)
