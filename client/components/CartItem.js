import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  return (
    <div className="single-product">
      <Link to={`/products/${props.current.id}`}>
        <img className="cart-product-img" src={props.current.imageUrl} />
      </Link>
      <Link to={`/products/${props.current.id}`}>
        <h3>{props.current.name}</h3>
      </Link>
      <p>{props.current.origin}</p>
      <p>{props.current.price / 100} USD</p>
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
      <button type="submit">Remove Item</button>
    </div>
  )
}

export default CartItem
