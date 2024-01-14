import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { addressReducer } from "./Reducers/addressReducer";
import { cartReducers } from "./Reducers/cartReducers";
import { orderReducer } from "./Reducers/orderReducer";


const reducer=combineReducers({
    cart:cartReducers,
    orderCreate:orderReducer,
    addressCreate:addressReducer
})

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []

const initialState={
    cart:{
        cartItems:cartItemsFromStorage
    }
}


const middleware=[thunk]


const store = createStore(  reducer, initialState,  composeWithDevTools(applyMiddleware(...middleware)) )





export default store