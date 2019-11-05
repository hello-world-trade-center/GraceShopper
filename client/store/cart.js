import axios from 'axios'

//ACTION TYPES
const ADDED_TO_CART = 'ADD_TO_CART'
const REMOVED_FROM_CART = 'REMOVE_FROM_CART'
const BOUGHT_CART = 'BOUGHT_CART'

//INITIAL STATE
const cart = []

//ACTION CREATORS
const addToCart = product => ({type: ADDED_TO_CART, product})
const removeFromCart = product => ({type: REMOVED_FROM_CART, product})
const boughtCart = () => ({type: BOUGHT_CART})

export const buyCart = () => {
  return async dispatch => {
    try {
      cart.forEach(item => {
        // await axios.post(`/api/${item.id}`)
        // await axios.post(`/api${user.id}`, item)
        dispatch(boughtCart())
      })
    } catch (err) {
      console.error(err)
    }
  }
}

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
      return [...state, action.product]
    case REMOVED_FROM_CART:
      return state.filter(item => item.id !== action.product.id)
    case BOUGHT_CART:
      return []
    default:
      return state
  }
}
