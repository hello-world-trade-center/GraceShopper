import React from 'react'
import {Link} from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'Vitelotte',
    price: '199.99',
    description:
      'Vitelotte, is a gourmet French variety of blue-violet potato. It has been cultivated in France at least since the early 19th century.',
    origin: 'France',
    rating: 4.8,
    imageUrl:
      'http://cdn.webshopapp.com/shops/145216/files/240944855/potatoes-vitelotte-purple-per-100-gram.jpg'
  },
  {
    id: 2,
    name: 'Belle de Fontenay',
    price: '89.97',
    description:
      'A beautiful French first-early potato variety firm and waxy in texture. Perfect for Sunday lunches in late spring to early summer.',
    origin: 'France',
    rating: 4.1,
    imageUrl: 'http://www.doreoc.com/wp-content/uploads/2014/05/charlotte.jpg'
  }
]

const allProducts = () => {
  return (
    <div>
      {products.map(product => {
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

export default allProducts
