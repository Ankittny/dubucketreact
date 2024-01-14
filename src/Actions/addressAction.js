import axios from "axios"
import { CREATE_ADDRESS_FAIL, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS } from "../Constants/addressConstants"





export const addAddress=(add)=>async(dispatch)=>{

  try{

    dispatch({
        type:CREATE_ADDRESS_REQUEST
    })

    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    const {data}= await axios.post('https://dubucket.com/administrator/api/addressadd',config,add)

    dispatch({
        type:CREATE_ADDRESS_SUCCESS,
        payload:data
    })

  } 

  catch(error) {
    dispatch({
        type:CREATE_ADDRESS_FAIL,
        payload:error

    })

  }

}