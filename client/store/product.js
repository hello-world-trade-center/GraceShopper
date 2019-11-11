import axios from 'axios'

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'

//ACTION CREATORS
function gotProducts(products) {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

function gotProduct(product) {
  return {
    type: GOT_PRODUCT,
    product
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

export function getProduct(productId) {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(gotProduct(data))
    } catch (error) {
      console.error(err)
    }
  }
}

const productState = {
  allProducts: [],
  singleProduct: {}
}

const productReducer = (state = productState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, allProducts: state.allProducts.concat(action.products)}
    case GOT_PRODUCT: {
      const newSingleProduct = {...state, singleProduct: action.product}
      return newSingleProduct
    }
    default:
      return state
  }
}

export default productReducer
