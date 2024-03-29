import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../Constants/orderConstants"

export const orderReducer=(state={},action)=>{
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return{
                loading:true

            }

        case CREATE_ORDER_SUCCESS:
                return{
                    loading:false,
                    success:true,
                    order:action.payload
    
                }  
                
        case CREATE_ORDER_FAIL:
                return{
                        loading:false,
                        error:action.payload
        
                    }          

        default:
            return state    
    }
}
