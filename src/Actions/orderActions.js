import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../Constants/orderConstants"
import axios from 'axios'

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

   

        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        const { data } = await axios.post(
            'https://dubucket.com/administrator/api/order',
            order,
            config
        )

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

       /* dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems') */


    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error
        })
    }
} 

