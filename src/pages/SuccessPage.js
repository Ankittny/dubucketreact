import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {addToCart,Remove } from "../Actions/cartActions"; 
import { Helmet } from "react-helmet";
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import postApi from "../Model/postApi.js";


const SuccessPage = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchTransactionStatus = async () => {
  //     try {
  //       const merchantId = 'PGTESTPAYUAT91'; // Replace with your actual merchant ID
  //       const merchantTransactionId = 'MT7850590068188114'; // Replace with your actual transaction ID
  //       const saltKey = '05992a0b-5254-4f37-86fb-e23bb79ea7e7'; // Replace with your actual salt key
  //       const saltIndex = '1'; // Replace with your actual salt index

  //       const path = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  //       const sha256Value = CryptoJS.SHA256(`${path}${saltKey}`).toString(CryptoJS.enc.Hex) + `###${saltIndex}`;
  //       const response = await axios.get(`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-VERIFY': sha256Value,
  //           'X-MERCHANT-ID': merchantId,
  //         }
  //       });
  //       online_place(response.data.data.paymentInstrument.pgServiceTransactionId)
  //       //console.log('Transaction Status:', response.data.data.paymentInstrument.pgServiceTransactionId);
  //       // Handle the response data here
  //     } catch (error) {
  //       console.error('Error fetching status:', error);
  //       // Handle errors here
  //     }
  //   };

  //   fetchTransactionStatus(); // Call the function when the component mounts
  // }, []); // Empty dependency array means it runs once when the component mounts


  // const online_place = (item) => {
  //    //setIsLoading(true);
  //   let data = JSON.stringify({
  //     shipping_address_id:localStorage.getItem('addressid'),
  //     billing_address_id: localStorage.getItem('addressid'),
  //     transactionid: item,
  //     shipping_method_id: parseInt(1),
  //     coupon: ""
  //   });
  //   const auth = JSON.parse(localStorage.getItem('auth'));
  //   postApi.PaywithPhonepe(data, auth.access_token).then((response) => {
  //     localStorage.removeItem('addressid');
  //     localStorage.removeItem('cartItems');
  //       console.log("this is test,",response);
  //   }).catch((error) => {
  //     console.log('the catch error is ===>', error)
  //   });
  // };

  return (
    <>
      <Header />
      <Helmet>
        <title>Dubucket Food & Beverage - Fast Delivery</title>
        <meta name="description" content="dubcket chicken" />
      </Helmet>

      <div class="row d-flex justify-content-center" style={{background:'#47c257'}}>
         <div class="col-md-6">
            <div class="p-5 text-center">
               <i class="icofont-check-circled display-1" style={{color:'#f15925'}}></i>
               <h1 class="text-white font-weight-bold">Dubucket, Your order has been successful 🎉</h1>
               <p class="text-white">Check your order status in <a href="complete_order.html" class="font-weight-bold text-decoration-none text-white">My Order</a> about next steps information.</p>
            </div>
            <div class="bg-white rounded p-3 m-5 text-center">
               <h6 class="font-weight-bold mb-2">Preparing your order</h6>
               <p class="small text-muted">Your order will be prepared and will come soon</p>
               <a href="/order" class="btn rounded btn-warning btn-lg btn-block" style={{color: 'black !important', background: '#f15925 !important ',bordercolor: '#f15925 !important'}}>Track My Order</a>
            </div>
         </div>
      </div>
      <Footer />
    </>

  );
}
export default SuccessPage;
