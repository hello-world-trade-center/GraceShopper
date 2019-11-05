import axios from 'axios'

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS'

//ACTION CREATORS
export function gotProducts(products) {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

//THUNK CREATORS
export function getProducts() {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products`)

      dispatch(gotProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const productState = []

const productReducer = (state = productState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return state.concat(action.products)

    default:
      return state
  }
}

export default productReducer
