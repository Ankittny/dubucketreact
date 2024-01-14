import React from "react";
import UserLogin from "../components/UserLogin.js";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Header />
      <Helmet>
        <title>Dubucket-Login</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
       <UserLogin />
      <Footer />
    </>

  );
}
export default LoginPage;
