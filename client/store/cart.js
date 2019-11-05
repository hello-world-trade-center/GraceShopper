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
const buyCart = () => ({type: BOUGHT_CART})

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
