import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import postApi from "../Model/postApi.js";
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions"; 
import { useHistory } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Loader from './Loader';



const ProductList = (props) => {
    //console.log(props?.ProductList);
    const slug = props?.CategoryData?.slug;
    const dispatch = useDispatch();
    const [ProductData, setProduct] = useState(props?.ProductList);
    const [SubcatData, setSubCategory] = useState([]);
    const [CategoryData, setCategory] = useState(props?.CategoryData);
    const [CatName,SetCatName] = useState(props.CategoryData?.name);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const history = useHistory();
    useEffect(() => {
        postApi.GetProductByCat(slug).then((response) => {
                if (response.status === 200) {
                    if (response.data.subCategories != null) {
                        setSubCategory(response.data.subCategories);
                    }
                } else {
                    alert("false");
                }
            }).catch((error) => {
                console.log('the catch error is ===>', error)
            })
    }, [slug]);


    const handleClick = (item) => {
        setIsLoading(true);
        const slug = item?.CategoryData ? item?.CategoryData?.slug : item?.subcat?.slug;
        const name = item?.CategoryData ? item?.CategoryData?.name : item?.subcat?.name;
        SetCatName(name);
        postApi.ProductByCategory(slug).then((response) => {
            if (response.status === 200) {
                if (response.data.products.length > 0) {
                    setProduct(response.data.products);
                    setTimeout(() => {
                        setIsLoading(false); // loading false
                      }, 1000);
                }
            } else {
                setProduct([]);
                setTimeout(() => {
                    setIsLoading(false); // loading false
                  }, 1000);
            }
        }).catch((error) => {
            console.log('the catch error is ===>', error)
        });
    }



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
                        <div className="col-lg-3 col-md-3 col-sm-3" >
                            <div className="osahan-listing">
                                <div className="left-section scrollbar-custom">
                                    <ul className="category list-unstyled">
                                        <nav className="category-list">
                                            <Link className="jUjInL" onClick={() => handleClick({CategoryData})}>
                                                <div className="gwBBkO">
                                                    <div className=" giIiuy">
                                                        <img src={process.env.REACT_APP_API_ENDPOINT + CategoryData?.image} alt={CategoryData?.image} className=" fONBrx" />
                                                    </div>
                                                    <div className="fYRgqC">{CategoryData?.name}</div>
                                                </div>
                                            </Link>
                                            {SubcatData.map((subcat) => (
                                                <Link className="jUjInL" onClick={() => handleClick({subcat})}>
                                                    <div className="gwBBkO">
                                                        <div className=" giIiuy">
                                                            <img src={process.env.REACT_APP_API_ENDPOINT + subcat?.image} alt={subcat?.image} className=" fONBrx" />
                                                        </div>
                                                        <div className="fYRgqC">{subcat?.name}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </nav>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9" >
                            <div className="osahan-listing">
                                <div className="d-flex align-items-center mb-3">
                                    <h4>{[CatName]}</h4>
                                    <div className="m-0 text-center ml-auto">
                                        <Link href="#" data-toggle="modal" data-target="#exampleModal" className="btn text-muted bg-white mr-2"><i className="icofont-filter mr-1"></i> Filter</Link>
                                        <Link href="#" data-toggle="modal" data-target="#exampleModal" className="btn text-muted bg-white"><i className="icofont-signal mr-1"></i> Sort</Link>
                                    </div>
                                </div>
                {(() => {
                    if (isLoading === true) {
                      return (
                        < Loader />
                      )
                    } else {
                        return (
                                <div className="row">
                                    {ProductData.map((object) => (
                                        <div className="col-6 col-lg-3 col-md-6 mb-3">
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
                      )
                    }            
               })()}                 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ProductList;