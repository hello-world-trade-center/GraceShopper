import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const AllProducts = props => {
  return (
    <div className="allProducts">
      {props.products.map(product => {
        return (
          <div key={product.id} className="product">
            <img className="product-img" src={product.imageUrl} />
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{product.origin}</p>
            <p>{product.price / 100}</p>
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
