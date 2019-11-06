import React from 'react'

const products = [
  {
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
    name: 'Belle de Fontenay',
    price: '89.97',
    description:
      'A beautiful French first-early potato variety firm and waxy in texture. Perfect for Sunday lunches in late spring to early summer.',
    origin: 'France',
    rating: 4.1,
    imageUrl: 'http://www.doreoc.com/wp-content/uploads/2014/05/charlotte.jpg'
  }
]

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 1
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement() {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      })
    }
  }

  render() {
    return (
      <div>
        <h2>SHOPPING CART</h2>
        <ol>
          {products.map((product, idx) => (
            <div key={idx} className="product">
              <li>
                <img className="product-img" src={product.imageUrl} />
                <h3>{product.name}</h3>
                <p>{product.origin}</p>
                <p>{product.price} USD</p>
                <div>
                  <button onClick={this.increment}>+</button>
                  <p>{this.state.count}</p>
                  <button onClick={this.decrement}>-</button>
                </div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    )
  }
}

export default Cart
