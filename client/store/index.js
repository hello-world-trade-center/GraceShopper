import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './product'
import cartReducer, {saveState} from './cart'

const reducer = combineReducers({
  user: user,
  products: productReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

store.subscribe(() => {
  saveState(store.getState().cart)
})

export default store
export * from './user'
export * from './product'
export * from './cart'
