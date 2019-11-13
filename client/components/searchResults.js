import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const filteredResults = (products, input) => {
  return products.filter(product => {
    return product.name.toLowerCase().includes(input.toLowerCase())
  })
}
const searchResults = props => {
  const products = filteredResults(props.products, props.match.params.input)
  return (
    <div>
      {products.length ? (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <div className="search-items">
                <div>
                  <Link to={`/products/${product.id}`}>
                    <img className="sResult-pic" src={product.imageUrl} />
                  </Link>
                </div>
                <div>
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  <p> {product.description}</p>
                  <p> ${product.price}</p>
                </div>
              </div>
              <hr className="line-break" />
            </div>
          ))}
        </div>
      ) : (
        <h3>No search results found</h3>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  }
}

export default connect(mapStateToProps)(searchResults)
