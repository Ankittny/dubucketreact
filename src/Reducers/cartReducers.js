
import { ADD_TO_CART, DECREASE_CART_QTY, INCREASE_CART_QTY, REMOVE_FROM_CART } from "../Constants/cartConstants";




export const cartReducers=(state={cartItems:[]},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item=action.payload
            const existItem=state.cartItems.find((x)=> x.product===item.product)

            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((x)=>x.product===existItem.product ? item : x)
                }
            }

            else{

                return{
                    ...state,
                    cartItems:[...state.cartItems,action.payload]
    
                }

            }


    case INCREASE_CART_QTY:
        var data=state.cartItems
         //console.log('data', data)
        const item2 = action.payload

        //console.log('slug passed',item2)

        const i = data.findIndex((item) => item.product === item2);

        //console.log('i', i)

        //console.log('i', data[i])
        // return -1 means not exist in cart

       data[i].qty = data[i].qty + 1;







        return{

            ...state,
            cartItems:[...data]


        }


    
    case DECREASE_CART_QTY:
        var data2=state.cartItems
        const item3 = action.payload

        //console.log('slug passed',item2)


        const p = data2.findIndex((item) => item.product === item3);
            if (data2[p].qty > 1) {
              data2[p].qty = data2[p].qty - 1;
            } 


            // if(data2[p].qty===1){
            //     data2[p].qty=1
            // }
            
            else {
              data2.splice(p, 1); // splice jump from index
            }
            return{
                ...state,
                cartItems:[...data2]
            } 
            
            
    case REMOVE_FROM_CART:
      
        const item4 = action.payload

        return{
            ...state,
            cartItems:[...state.cartItems.filter((item)=>item.product !==item4)]
        }

         default:
            return state   

    }
}