import React,{useState} from "react";
import Link from '@mui/material/Link';
import postApi from "../Model/postApi.js";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions";


const TopList = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
                    dispatch(addToCart(objet?.id,auth.access_token));
                    setLoadingProductId(null);
                    console.log(
                        err.response &&
                        err.response.data.message &&
                        err.response.data.message
                    );
                });
        } else {
            history.push("/login")
        }
    };


    return (
        <>
            <div className="title d-flex align-items-center py-3">
                <h5 className="m-0">Best Products</h5>
                {/* <Link className="ml-auto btn btn-outline-success btn-sm" href="#">See more</Link> */}
            </div>
            <div className="pick_today">
                <div className="row">
                    {props.bestProducts.map((object, index) => (
                        <div class="col-12 col-lg-2 col-md-6 col-sm-6 mb-3">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                <div class="list-card-image">
                                   
                                    {(() => {
                                        if(object.price && object.offer_price){
                                          return (
                                            <div class="member-plan position-absolute"><span class="badge m-3 badge-danger">{(((object.price - object.offer_price) / object.price) * 100).toFixed(0)}%</span></div>
                                          )
                                        }
                                    })()}
                                       <div class="p-3">
                                       <Link href={`details/${object?.slug}`} class="text-dark">
                                            <img src={process.env.REACT_APP_API_ENDPOINT + "/" + object.thumb_image} class="img-fluid item-img w-100 mb-3" alt="not found" />
                                          
                                            <h6>{object?.name}</h6>
                                            <h6>{object?.unitkg}</h6>
                                        </Link>
                                            <div class="d-flex align-items-center">
                                            {(()=>{
                                              if(object.price & object.offer_price){
                                                return(
                                                    <>
                                                        <h6 class="price m-0 text-danger"><del>₹ {object?.price}</del></h6>
                                                        &nbsp;&nbsp;&nbsp;<h4 class="price m-0 text-success">₹ {object?.offer_price}</h4>
                                                    </>
                                                )
                                              }  else {
                                                return(
                                                    <>
                                                        <h6 class="price m-0 text-danger"><del>₹ {object?.price}</del></h6>
                                                    </>
                                                )
                                              }
                                            })()}   
                                             {object.qty === 0 || object.qty ===-1 ? (
                                                                <button  className="btn btn-danger btn-sm ml-auto">Out of stock</button>
                                                                ) : (
                                                                <button onClick={() => addToCartHandler(object)} className="btn btn-success btn-sm ml-auto" disabled={loadingProductId === object?.id}>{loadingProductId === object?.id ? 'Loading...' : 'Add'}</button>
                                                            )}
                                        {/* <button onClick={() => addToCartHandler(object)} className="btn btn-success btn-sm ml-auto" disabled={loadingProductId === object?.id}>{loadingProductId === object?.id ? 'Loading...' : 'Add'}</button> */}
                                                 
                                                {/* <div class="collapse qty_show" id="collapseExample2">
                                                    <div>
                                                        <span class="ml-auto">

                                                       

                                                            <form id='myform' class="cart-items-number d-flex" method='POST'>
                                                                <input type='button' value='-' class='qtyminus btn btn-success btn-sm' field='quantity' />
                                                                <input type='text' name='quantity' value='1' class='qty form-control' />
                                                                <input type='button' value='+' class='qtyplus btn btn-success btn-sm' field='quantity' />
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

        </>
    );
}
export default TopList;
