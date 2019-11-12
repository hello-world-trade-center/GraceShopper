import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Home = props => {
  const products = props.products.allProducts
  const featured = []
  const map = {}
  while (featured.length !== 4 && products.length) {
    const random = Math.floor(Math.random() * 8)
    if (map[random] === undefined) {
      featured.push(products[random])
    }
    map[random] = random
  }
  return (
    <div className="home_page">
      <div className="center_container">
        <div className="img_home">
          <img src="https://static.wixstatic.com/media/e30e9b_90f1ac2089004e40978efb72d0394254~mv2.jpg/v1/fill/w_290,h_290,al_c,q_80,usm_0.66_1.00_0.01/e30e9b_90f1ac2089004e40978efb72d0394254~mv2.jpg" />
        </div>
        <div className="content_home">
          <h4>Organic potatoes you love, for less</h4>
          {props.user.id ? (
            <div className="siteInfo_home">
              <p>
                <em>Pommes de Terre</em> is a luxery boutique offering the most
                exotic and prestiguous genus of spuds. It was founded by Mr.
                Potato-Head and his wife in 2019. Together, their mission was to
                bring nobel potatoes to homes worthy of their pedigre.
              </p>
            </div>
          ) : (
            <div className="signup_home">
              <p>Join us and get 10% off on all luxury potatoes</p>
              <Link to="/signup">
                <button>Sign up</button>
              </Link>
            </div>
          )}
          <div className="allProducts_home">
            <p>View Our Products</p>
            <Link to="/products">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
      <h2>Featured Products</h2>
      <div className="featured_products">
        {featured.map(product => {
          return (
            <div className="single_featured_product" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img className="single_featured_img" src={product.imageUrl} />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.origin}</p>
              <p>{product.price / 100} USD</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
})

export default connect(mapStateToProps)(Home)
