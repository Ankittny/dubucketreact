
import postApi from "../Model/postApi.js";
import { ADD_TO_CART, DECREASE_CART_QTY, INCREASE_CART_QTY, REMOVE_FROM_CART } from "../Constants/cartConstants"


export const addToCart = (id,token) => async (dispatch, getState) => {
     
     var sum = 0,
        total = 0,
        delivery = 0;
    postApi.GetCart(token).then((res) => {
        if (res.status === 200) {
            res.data.cartProducts.map(item => {
                sum = sum + item?.product?.offer_price * item?.qty;
                //console.log(sum);
                if (total < 199) {
                    total = (sum + delivery).toFixed(2);
                } else {
                    total = (sum).toFixed(2)
                    delivery = 0;
                }
            });





            //console.log("this is test",res.data.cartProducts.length,total);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: id,
            qty: res.data.cartProducts.length,
            total: total,
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));


           
        }
    }).catch((err) => {
        //   setLoading(false);
        console.log(err);
    });
}


export const Remove=(slug)=>async(dispatch,getState)=>{
    dispatch({
        type:REMOVE_FROM_CART,
        payload:slug
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}














