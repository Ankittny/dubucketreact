import React, { useState, useEffect } from "react";
import Cart from "../components/Cart.js";
import Link from '@mui/material/Link';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Loader from './Loader';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";



const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartitem] = useState([]);
  const auth = JSON.parse(localStorage.getItem('auth'));
  //alert(auth?.access_token);

  useEffect(() => {
    postApi.GetCart(auth?.access_token).then((res) => {
      if (res.status === 200) {
        setCartitem(res.data);
        setIsLoading(false);
      }
    }).catch((err) => {
      setCartitem([]);
      setIsLoading(false);
      console.log(err);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Dubucket Food & Beverage - Fast Delivery</title>
      </Helmet>
      <Header />
      <section className="py-4 osahan-main-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="osahan-home-page">
                <div className="osahan-body">
                  {(() => {
                    if (isLoading === true) {
                      return (
                        < Loader />
                      )
                    } if (cartItem.length === 0) {
                      return (
                        <>
                          <section className="py-4 osahan-main-body">
                            <div className="container text-center">
                              <img src="../assets/img/empty.png" alt="Empty Cart" />
                              <h2>Your cart is empty</h2>
                              <p>Please add items to your cart</p>
                              <Link style={{color: "white"}} className="btn btn-success rounded-right" href="/">Go to Home</Link>
                            </div>
                          </section>
                        </>

                      )

                    } else {
                      return (
                        <>
                          <Cart cartItem={cartItem} />
                        </>
                      )
                    }

                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default CartPage;
