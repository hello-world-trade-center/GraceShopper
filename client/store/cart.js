import Axios from 'axios'

//ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADDED_CART_ITEM = 'ADDED_CART_ITEM'
const DELETED_CART_ITEM = 'DELETED_CART_ITEM'
const CLEAR_CART = 'CLEAR_CART'

//ACTION CREATORS
const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const addedCartItem = (orderId, product, qty = 1) => ({
  type: ADDED_CART_ITEM,
  orderId,
  product,
  qty
})

const deletedCartItem = productId => ({
  type: DELETED_CART_ITEM,
  productId
})

const clearedCart = () => ({
  type: CLEAR_CART
})

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializeState = JSON.stringify(state)
    localStorage.setItem('cart', serializeState)
  } catch (err) {
    // Do nothing.
  }
}

export function getCart(orderId) {
  if (orderId === 0) {
    return async dispatch => {
      const cart = loadState()
      dispatch(gotCart(cart))
    }
  }
  return async dispatch => {
    try {
      const localCart = loadState()
      const orderItems = localCart.order_items.map(item => {
        return dispatch(addCartItem(orderId, item.product, item.amount))
      })
      return Promise.all(orderItems).then(() => {
        Axios.get(`/api/orders/${orderId}`)
          .then(response => {
            dispatch(gotCart(response.data))
          })
          .catch(err => console.log('Error loadCart:', err))
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteCartItem(orderId, itemId) {
  if (orderId === 0) {
    return async dispatch => {
      dispatch(deletedCartItem(itemId))
    }
  }

  return async dispatch => {
    try {
      const deletedOrder = await Axios.delete(
        `/api/order_item/${orderId}/${itemId}`
      )
      dispatch(deletedCartItem(itemId))
    } catch (error) {
      console.error(error)
    }
  }
}

export function addCartItem(orderId, item, qty) {
  if (orderId === 0) {
    return async dispatch => {
      dispatch(addedCartItem(orderId, item, qty))
    }
  }

  return async dispatch => {
    try {
      const newOrder = await Axios.post(`/api/order_item/${orderId}`, {
        productId: item.id,
        amount: qty
      })
      dispatch(addedCartItem(orderId, item, qty))
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearCart() {
  return dispatch => {
    dispatch(clearedCart())
  }
}

//INITIAL STATE
const cart = {
  order_items: []
}

const cartReducer = (state = loadState() || cart, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case CLEAR_CART:
      return {...state, order_items: []}
    case DELETED_CART_ITEM:
      return {
        ...state,
        order_items: state.order_items.filter(
          item => item.productId !== action.productId
        )
      }
    case ADDED_CART_ITEM:
      let cartItems
      let productExistsInCart = state.order_items.some(
        item => item.productId === action.product.id
      )
      if (productExistsInCart) {
        cartItems = state.order_items.map(item => {
          if (item.product.id === action.product.id) {
            item.amount = action.qty
          }
          return item
        })
      } else {
        cartItems = state.order_items.concat([
          {
            orderId: action.orderId,
            product: action.product,
            productId: action.product.id,
            amount: action.qty
          }
        ])
      }
      return {...state, order_items: cartItems}
    default:
      return state
  }
}
export default cartReducer
