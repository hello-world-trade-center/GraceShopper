import axios from 'axios'

//ACTION TYPES
const BUY_PRODUCT = 'BUY_PRODUCT'

//ACTION CREATORS
const buyProduct = product => ({type: BUY_PRODUCT, product})

//THUNK CREATORS
// export const boughtProduct = (product) => {
//     return async (dispatch) => {
//         try{
//             const {data} = await axios.get(`/api/${product.id}`)
//         } catch(err) {
//             console.error(err)
//         }
//     }
// }
