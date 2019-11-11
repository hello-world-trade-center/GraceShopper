import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user}) // Kait

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
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
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
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
    const userToUpdate = await axios.put(`/${user.id}/profile`)
    dispatch(updateUser(userToUpdate.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * INITIAL STATE
 */
const defaultUser = {
  allUsers: [],
  singleUser: {}
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
      return {...state, singleUser: action.user}
    default:
      return state
  }
}
