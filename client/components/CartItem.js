import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const product = props.current.product
  function remove(evt) {
    evt.preventDefault()
    props.remove(props.current.id, product.id)
  }

  function qtySelector(evt) {
    evt.preventDefault()
    props.addItem(props.current.orderId, product, evt.target.value)
  }

  return (
    <div className="single-product">
      <Link to={`/products/${product.id}`}>
        <img className="cart-product-img" src={product.imageUrl} />
      </Link>
      <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>{product.origin}</p>
      <p>{product.price / 100} USD</p>
      <select onChange={evt => qtySelector(evt)}>
        <option value={props.current.amount}>{props.current.amount}</option>
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
      <button type="submit" onClick={evt => remove(evt)}>
        Remove Item
      </button>
    </div>
  )
}

export default CartItem
