import axios from 'axios'
import history from '../history'
import {getCart, clearCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_ORDER_DATA = 'GET_ORDER_DATA'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user}) // Kait
const getOrderData = data => ({type: GET_ORDER_DATA, data})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    if (res.data) {
      const orders = res.data.orders
      const current = orders.filter(order => order.complete === false)[0]
      dispatch(getCart(current.id))
    } else {
      dispatch(getCart(0))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  name,
  address,
  city,
  zip
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      name,
      address,
      city,
      zip
    })
    history.push('/home')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    const currentOrder = res.data.orders[res.data.orders.length - 1]
    dispatch(getCart(currentOrder.id))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(clearCart())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
// export const gotUser = () => async dispatch => {
//   try {
//     const user = await axios.get(`/api/users/${user.id}`)
//   } catch (error) {
//     console.error(error)
//   }
// }

export const update = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}/profile`, user)
    // console.log('data', data)
    dispatch(updateUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const getUserCartInfo = user => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${user.id}/profile`)
    console.log('TCL: data', data)

    dispatch(getOrderData(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case GET_ORDER_DATA:
      // console.log('STATE Inside the REDUCER ***', state)
      console.log('THIS IS THE ACTION', action.data)
      return {...state, orders: action.data}
    default:
      return state
  }
}
