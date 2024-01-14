import { CREATE_ADDRESS_FAIL, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS } from "../Constants/addressConstants"



export const addressReducer=(state={address:{}},action)=>{
    switch(action.type){
        case CREATE_ADDRESS_REQUEST:
            return{
                loading:true

            }

        case CREATE_ADDRESS_SUCCESS:
                return{
                    loading:false,
                    success:true,
                    address:state.address(action.payload)
    
                }  
                
        case CREATE_ADDRESS_FAIL:
                return{
                        loading:false,
                        error:action.payload
        
                    }          

        default:
            return state    
    }
}
