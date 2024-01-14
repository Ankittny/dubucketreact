import React from "react";
import StoreRegisterPage from "../components/StoreRegisterPage.js";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Helmet } from "react-helmet";
const StoreRegister = () => {
  return (
    <>
      <Header />
      <Helmet>
        <title>Dubucket-Registration</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <StoreRegisterPage />
      <Footer />
    </>

  );
}
export default StoreRegister;
