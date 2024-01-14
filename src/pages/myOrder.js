import React, { useState,useEffect } from "react";
import Order from "../components/Order.js";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Loader from './Loader.js';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";



const myorder = () => {

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
                  <Order/>
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
export default myorder;
