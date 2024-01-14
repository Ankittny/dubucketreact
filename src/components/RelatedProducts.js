import React,{useState} from "react";
import Link from '@mui/material/Link';
import postApi from "../Model/postApi";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions";

const RelatedProducts = (props) => {
    const [loadingProductId, setLoadingProductId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const addToCartHandler = (objet) => {
        setLoadingProductId(objet.id);
       // setIsLoadingButton(true);
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth != null) {
            const url = `token=${auth?.access_token}&product_id=${objet?.id}&quantity=${"1"}`;
            //console.log("this is test Ankit",url);
            postApi.addToCard(url).then((res) =>{
               
                    dispatch(addToCart(objet?.id,auth.access_token));
                    setLoadingProductId(null);
                    //console.log(res)
                }).catch((err) => {
                    if(err.response.status===403){
                        if(err.response.data.message==="Quantity not available in our stock"){
                            dispatch(addToCart(objet?.id,auth.access_token));
                            setLoadingProductId(null);
                            return false;
                        } if(err.response.data.message === "Item already exist"){
                             dispatch(addToCart(objet?.id,auth.access_token));
                             setLoadingProductId(null);
                        } else {
                            //console.log(err.response);
                            dispatch(addToCart(objet?.id,auth.access_token));
                            setLoadingProductId(null);
                        } 
                    }
                });
        } else {
            history.push("/login")
        }
    };

    return (
        <>
            <section className="py-4 osahan-main-body">
                <div className="container">
                    <h5 className="mt-3 mb-3">Maybe You Like this.</h5>
                    <div className="row">

                    {props.RelatedData.map((object) =>(
                        <div className="col-lg-3 col-sm-3 col-md-6 mb-3">
                            <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                <div className="list-card-image">
                                    {/* <Link href={`${object?.slug}`} className="text-dark"> */}
                                        <div className="member-plan position-absolute"><span className="badge m-3 badge-warning">15%</span></div>
                                        <div className="p-3">
                                            <img src={process.env.REACT_APP_API_ENDPOINT+object?.thumb_image} className="img-fluid item-img w-100 mb-3" alt="title-images" />
                                            <h6>{object?.short_name}</h6>
                                            <div className="d-flex align-items-center">
                                                        {(() => {
                                                            if(object.price && object.offer_price){
                                                                return (
                                                                    <p class="text-muted mb-2"><del class="text-danger mr-1">₹ {object?.price}</del> ₹{object?.offer_price} </p>
                                                                    )
                                                            } else {
                                                                return (
                                                                    <p class="text-muted mb-2">₹ {object?.price}</p>
                                                                ) 
                                                            }
                                                        })()}   
                                                {object?.qty === 0 || object?.qty ===-1  ? (
                                    <button  className="btn btn-danger btn-sm ml-auto">Out of stock</button>
                                 ) : (
                                    <button onClick={() => addToCartHandler(object)} className="btn btn-success btn-sm ml-auto" disabled={loadingProductId === object?.id}>{loadingProductId === object?.id ? 'Loading...' : 'Add'}</button>
                                 )}
                                                {/* <div className="collapse qty_show" id="collapseExample3">
                                                    <div>
                                                        <span className="ml-auto" href="#">
                                                            <form id='myform' className="cart-items-number d-flex" method='POST' action='#'>
                                                                <input type='button' value='-' className='qtyminus btn btn-success btn-sm' field='quantity' />
                                                                <input type='text' name='quantity' value='1' className='qty form-control' />
                                                                <input type='button' value='+' className='qtyplus btn btn-success btn-sm' field='quantity' />
                                                            </form>
                                                        </span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    );
}
export default RelatedProducts;