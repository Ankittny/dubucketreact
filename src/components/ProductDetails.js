import React,{useState} from "react";
import Link from '@mui/material/Link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import postApi from "../Model/postApi";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions";

const ProductDetails = (props) => {
   const [loadingProductId, setLoadingProductId] = useState(null);
   const dispatch = useDispatch();
   const history = useHistory();
   let images = props.gallery;
   var obj2 = { id: 100, product_id: 37, image: props.ProductDetail.thumb_image, status: 1, created_at: 234234345, updated_at: 2345345 };
   images.push(obj2);
   const responsive = {
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: 1,
         slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
         breakpoint: { max: 1024, min: 464 },
         items: 1,
         slidesToSlide: 1, // optional, default to 1.
      },
      mobile: {
         breakpoint: { max: 464, min: 0 },
         items: 1,
         slidesToSlide: 1, // optional, default to 1.
      },
   };


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
         <nav aria-label="breadcrumb" class="breadcrumb mb-0">
            <div class="container">
               <ol class="d-flex align-items-center mb-0 p-0">
                  <li class="breadcrumb-item"><Link href="/" class="text-success">Home</Link></li>
                  <li class="breadcrumb-item active" aria-current="page">{props.CategoryName?.name}</li>
               </ol>
            </div>
         </nav>

         <section className="py-4 osahan-main-body">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6">

                     <Carousel
                        className="recommend-slider mb-3"
                        responsive={responsive}
                        showIndicators={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showArrows={false}
                     >
                        {images.map((object, i) => (
                           <div className="osahan-slider-item" key={i} >
                              <img src={process.env.REACT_APP_API_ENDPOINT + object.image} className="img-fluid mx-auto shadow-sm rounded" alt="Responsive-imagess" />
                           </div>
                        ))}
                     </Carousel>
                  </div>
                  <div className="col-lg-6">
                     <div className="p-4 bg-white rounded shadow-sm">
                        <div className="pt-0">
                           <h2 className="font-weight-bold">{props.ProductDetail?.name.charAt(0).toUpperCase() + props.ProductDetail?.name.slice(1)}</h2>
                           {(() => {
                              if (props.ProductDetail?.price !== "" && props.ProductDetail?.offer_price !== "") {
                                 return (
                                    <>
                                       <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                          Product MRP : <b className="h6 text-dark m-0"><del class="text-danger mr-1"> ₹ {props.ProductDetail?.price}</del></b>
                                       </p>
                                       <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                          Sale Price : <b className="h6 text-dark m-0"> ₹ {props.ProductDetail?.offer_price}</b>
                                          <span className="badge badge-danger ml-2">{(((props.ProductDetail?.price - props.ProductDetail?.offer_price) / props.ProductDetail?.price) * 100).toFixed(0)}% OFF</span>
                                       </p>
                                    </>
                                 )
                              } else {
                                 return (
                                    <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                       Product MRP : <b className="h6 text-dark m-0">₹ {props.ProductDetail?.price}</b>
                                    </p>
                                 )
                              }

                           })()}


                          
                        </div>
                        <div className="pt-2">
                           <div className="row">
                              <div className="col-6">
                                 {/* <p className="font-weight-bold m-0">Delivery</p>
                                 <p className="text-muted m-0">Free</p> */}
                              </div>
                              <div className="col-6 text-right">
                                 {(() => {
                                    if (props.ActiveVariants.length > 0) {
                                       return (
                                          <>
                                             <p className="font-weight-bold m-0">Available in:</p>
                                             <p className="text-muted m-0">
                                                {props.ActiveVariants.map((object) => (
                                                   <span>{object.name},</span>
                                                ))}
                                             </p>
                                          </>
                                       )
                                    }
                                 })()}
                              </div>
                           </div>
                        </div>
                        <div className="details">
                           <div className="pt-3 bg-white">
                              <div className="d-flex align-items-center">
                                 <div className="btn-group osahan-radio btn-group-toggle" data-toggle="buttons">
                                    {props.ActiveVariants.map((object) => (
                                       <label className="btn btn-secondary active">
                                          <input type="radio" value={object?.price} name="options" id="option1" checked /> {object?.name}
                                          &nbsp;₹{object?.price}

                                       </label>
                                    ))}
                                 </div>
                                 {props?.ProductDetail?.qty === 0 || props?.ProductDetail?.qty ===-1  ? (
                                    <button  className="btn btn-danger btn-sm ml-auto">Out of stock</button>
                                 ) : (
                                    <button onClick={() => addToCartHandler(props?.ProductDetail)} className="btn btn-success btn-sm ml-auto" disabled={loadingProductId === props?.ProductDetail?.id}>{loadingProductId === props?.ProductDetail?.id ? 'Loading...' : 'Add'}</button>
                                 )}
                                 {/* <Link style={{color: "white"}} href="#" className="btn btn-success btn-sm ml-auto"><i className="icofont-plus m-0 mr-2"></i>ADD</Link> */}
                              </div>
                           </div>
                           <div className="pt-3">

                              <p className="font-weight-bold mb-2">Product Details</p>
                              <p className="text-muted small mb-0">{props.ProductDetail.short_description}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
export default ProductDetails;