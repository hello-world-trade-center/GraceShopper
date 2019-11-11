import Axios from 'axios'

//ACTION TYPES
// const ADDED_TO_CART = 'ADD_TO_CART'
// const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
// const BOUGHT_CART = 'BOUGHT_CART'
const GOT_CART = 'GOT_CART'
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADDED_CART_ITEM = 'ADDED_CART_ITEM'
const DELETED_CART_ITEM = 'DELETED_CART_ITEM'

//INITIAL STATE

//ACTION CREATORS
// const addToCart = product => ({type: ADDED_TO_CART, product})
// const removeFromCart = product => ({type: REMOVED_FROM_CART, product})
// const boughtCart = () => ({type: BOUGHT_CART})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const gotCartItems = data => ({
  type: GOT_CART_ITEMS,
  data
})

const addedCartItem = data => ({
  type: ADDED_CART_ITEM,
  data
})

// const updateCartItem = () => ({
//   type: UPDATE_CART_ITEM
// })

const deletedCartItem = () => ({
  type: DELETED_CART_ITEM
})

// const submitOrder = () => ({
//   type: SUBMIT_ORDER
// })

export function deleteCartItem(item) {
  return async dispatch => {
    try {
      const deletedOrder = await Axios.delete(`/api/order_item/${item.id}`)
      dispatch(deletedCartItem())
    } catch (error) {
      console.error(error)
    }
  }
}

export function addCartItem(item, order) {
  return async dispatch => {
    try {
      const newOrder = await Axios.post('/api/order_item/', {
        orderId: order,
        productId: item
      })
      dispatch(addedCartItem(newOrder))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCart(orderId) {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/orders/${orderId}`)

      dispatch(gotCart)
    } catch (error) {
      console.error(error)
    }
  }
}
export function getCartItems(orderId) {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/order_item/${orderId}`)

      dispatch(gotCartItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const cartObject = {
  cart: {},
  cartItems: []
}

const cartReducer = (state = cartObject, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    // case ADDED_TO_CART:
    //   return [...state, action.product]
    // case REMOVED_FROM_CART:
    //   return state.filter(item => item.id !== action.product.id)
    // case BOUGHT_CART:
    //   return []
    case GOT_CART_ITEMS:
      const allItems = action.data.map(current => {
        return current.product
      })
      const map = {}
      const allItems2 = allItems.filter(current => {
        if (!map[current.id]) {
          map[current.id] = current
          return current
        }
      })
      return {...state, cartItems: allItems2}

    case ADDED_CART_ITEM:
      console.log('order', action.data)
      return state
    // return {...state, cartItems: }

    case DELETED_CART_ITEM:
      return state

    default:
      console.log('default')
      return state
  }
}
export default cartReducer
