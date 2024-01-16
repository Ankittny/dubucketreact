import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import { useSelector } from "react-redux";

const Header  = () => {
const [SearchData, SetSearch] = useState("");
const carts = useSelector((state) => state.cart);
const { loading, error, cartItems } = carts;
  // console.log("this is test",cartItems[0].qty);


const HandleSearch = (event) => {
   SetSearch(event.target.value);
}

const Seacrh = () => {
   const URl = "http://localhost:3000/"+"search?search="+SearchData;
   window.location.href=URl
}


   return (
      <>
         <div className="bg-white shadow-sm osahan-main-nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-white osahan-header py-0 container-fluid">
               <Link className="navbar-brand mr-0" href="/">
                  <img className="img-fluid logo-img" src="../assets/img/logo.png" alt="title" />
               </Link>
               <div className="ml-3 d-flex align-items-center">
                  <div className="dropdown mr-3">
                     <Link className="text-dark dropdown-toggle d-flex align-items-center osahan-location-drop" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div><i className="icofont-location-pin d-flex align-items-center bg-light rounded-pill p-2 icofont-size border shadow-sm mr-2"></i></div>
                        <div>
                           <p className="text-muted mb-0 small">Select Location</p>
                           Modinagar India...
                        </div>
                     </Link>
                     {/* <div className="dropdown-menu osahan-select-loaction p-3" aria-labelledby="navbarDropdown">
                     <span>Select your city to start shopping</span>
                     <form className="form-inline my-2">
                        <div className="input-group p-0 col-lg-12">
                           <input type="text" className="form-control form-control-sm" id="inlineFormInputGroupUsername2" placeholder="Search Location" />
                           <div className="input-group-prepend">
                              <div className="btn btn-success rounded-right btn-sm"><i className="icofont-location-arrow"></i> Detect</div>
                           </div>
                        </div>
                     </form>
                     <div className="city pt-2">
                        <h6>Top Citys</h6>
                        <p className="border-bottom m-0 py-1"><Link href="#" className="text-dark">Banglore</Link></p>
                        <p className="border-bottom m-0 py-1"><Link href="#" className="text-dark">Noida</Link></p>
                        <p className="border-bottom m-0 py-1"><Link href="#" className="text-dark">Delhi</Link></p>
                        <p className="m-0 py-1"><Link href="#" className="text-dark">Mumbai</Link></p>
                     </div>
                  </div> */}
                  </div>
                  <div className="input-group mr-sm-2 col-lg-12">
                     <input onChange={HandleSearch} type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Search for Products.." />
                     <div className="input-group-prepend">
                        <div className="btn btn-success rounded-right" onClick={Seacrh}><i className="icofont-search"></i></div>
                     </div>
                  </div>
               </div>
               <div className="ml-auto d-flex align-items-center">
                  {(() => {
                     const auth = JSON.parse(localStorage.getItem('auth'));
                     if (auth==null) {
                        return (
                           <Link href="/login" className="mr-2 mr-3 text-dark cofont-size">
                              Login
                             {/* <i className="icofont-login"></i> */}
                           </Link>
                        )
                     } else {
                        return (
                           <Link href="/myaccount" className="mr-3 text-dark cofont-size">
                               My Account
                           </Link>
                        )
                     }
                  })()}
                  
                  

                  
                  {loading ? (
                        <p>{loading}</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : cartItems.length === 0 ? (
                     <>
                     <Link href="/cart" className="mycart">
                     <i className="icofont-shopping-cart">
                        <span className="cart-items-show">0 items</span>
                     </i>
                     
                     <div class="item-cart">₹ 0</div>
                     </Link>
                     </>   
                     ) : (

                        <>
                        <Link href="/cart" className="mycart">
                        <i className="icofont-shopping-cart">
                        <span className="cart-items-show">{cartItems[0]?.qty} items</span>
                     </i>
                     <div class="item-cart">₹ {cartItems[0]?.total}</div>
                     </Link>
                     </> 
                  )}
               

               </div>
            </nav>

         </div>

      </>
   );
}

export default Header;