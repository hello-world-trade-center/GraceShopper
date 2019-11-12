import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const product = props.current.product
  const amountArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  function remove(evt) {
    evt.preventDefault()
    props.remove(props.current.id || props.current.orderId, product.id)
  }

  function qtySelector(evt) {
    evt.preventDefault()
    props.addItem(props.current.orderId, product, Number(evt.target.value))
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
      <select value={props.current.amount} onChange={evt => qtySelector(evt)}>
        {amountArr.map((option, idx) => {
          return (
            <option key={idx + 1} value={idx + 1}>
              {idx + 1}
            </option>
          )
        })}
      </select>
      <button type="submit" onClick={evt => remove(evt)}>
        Remove Item
      </button>
    </div>
  )
}

export default CartItem
