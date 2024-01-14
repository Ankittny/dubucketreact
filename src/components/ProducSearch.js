import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import postApi from "../Model/postApi.js";
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions"; 
import { useHistory } from 'react-router-dom';




const ProducSearch = (props) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [ProductData, setProduct] = useState(props?.ProductList);
    const [loadingProductId, setLoadingProductId] = useState(null);
    

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
            //alert("this is test");
            history.push("/login")
        }
    };


    return (
        <>
            <section className="py-10 osahan-main-body">
                <div className="container-fluid">
                    <div className="row">
                       
                        <div className="col-lg-12 col-md-12 col-sm-9" >
                            <div className="osahan-listing">
                                <div className="d-flex align-items-center mb-3">
                                    <h4>Search Item</h4>
                                    <div className="m-0 text-center ml-auto">
                                        <Link href="#" data-toggle="modal" data-target="#exampleModal" className="btn text-muted bg-white mr-2"><i className="icofont-filter mr-1"></i> Filter</Link>
                                        <Link href="#" data-toggle="modal" data-target="#exampleModal" className="btn text-muted bg-white"><i className="icofont-signal mr-1"></i> Sort</Link>
                                    </div>
                                </div>
                
                        
                                <div className="row">
                                    {ProductData.map((object) => (
                                        <div className="col-6 col-lg-2 col-md-2 mb-2">
                                            <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                                <div className="list-card-image">

                                                    {(() => {
                                                        if (object.price && object.offer_price) {
                                                            return (
                                                                <div className="member-plan position-absolute"><span className="badge m-3 badge-danger">{(((object.price - object.offer_price) / object.price) * 100).toFixed(0)}%</span></div>
                                                            )
                                                        }
                                                    })()}
                                                    <div className="p-3">
                                                        <Link href={`details/${object?.slug}`} className="text-dark">
                                                            <img src={process.env.REACT_APP_API_ENDPOINT + object?.thumb_image} className="img-fluid item-img w-100 mb-3" alt="title" />
                                                            <h6>{object?.short_name}</h6>
                                                        </Link>
                                                        <h6>{object?.unitkg}</h6>
                                                        <div className="d-flex align-items-center">
                                                            
                                                            {(() => {
                                                                if (object.price && object.offer_price) {
                                                                    return (
                                                                        <p class="text-muted mb-2 price"><span class="offer-price">₹{object?.offer_price}</span> <del class="text-danger mr-1">₹{object?.price}</del> </p>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <p class="text-muted mb-2"><span class="offer-price">₹{object?.price}</span></p>
                                                                    )
                                                                }
                                                            })()}

                                                            {object.qty === 0 || object.qty ===-1  ? (
                                                                <button  className="btn btn-danger btn-sm ml-auto">Out of stock</button>
                                                                ) : (
                                                                <button onClick={() => addToCartHandler(object)} className="btn btn-success btn-sm ml-auto" disabled={loadingProductId === object?.id}>{loadingProductId === object?.id ? 'Loading...' : 'Add'}</button>
                                                            )}
                                                            {/* <div className="collapse qty_show" id="collapseExample1">
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

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                      
                             
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ProducSearch;