import Axios from 'axios'

//ACTION TYPES
// const ADDED_TO_CART = 'ADD_TO_CART'
// const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
// const BOUGHT_CART = 'BOUGHT_CART'
const GOT_CART = 'GOT_CART'
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

//INITIAL STATE
const cartObject = {
  cart: {},
  cartItems: []
}

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

const updateCartItem = () => ({
  type: UPDATE_CART_ITEM
})

const deleteCartItem = () => ({
  type: DELETE_CART_ITEM
})

const submitOrder = () => ({
  type: SUBMIT_ORDER
})

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
      console.log('data', action.data)
      return {...state, cartItems: action.data}
    default:
      console.log('default')
      return state
  }
}
export default cartReducer
