import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import StoreRegister from "./pages/StoreRegister.js";
import ProductPage from "./pages/ProductPage.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import VerifyyouPage from "./pages/VerifyyouPage.js";
import LoginPage from "./pages/LoginPage.js";
import CartPage from "./pages/CartPage.js";
import SuccessPage from "./pages/SuccessPage.js";
import UserDeshboard from "./pages/UserDeshboard.js";
import myOrder from "./pages/myOrder.js";
import MyWallet from "./pages/MyWallet.js";
import About from "./pages/About.js";
import Privacy from "./pages/Privacy.js";
import TermsAndConditions from "./pages/TermsAndConditions.js";
import Contact from "./pages/Contact.js";
import Search from "./pages/Search.js";


import { ToastContainer } from 'react-toastify';
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT+"api"+"/";
 
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact  path="/cart" component={CartPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/store-register" component={StoreRegister} />
        <Route exact  path="/order/success" component={SuccessPage} />
        <Route exact  path="/myaccount" component={UserDeshboard} />
        <Route exact  path="/about" component={About} />
        <Route exact  path="/privacy" component={Privacy} />
        <Route exact  path="/terms-and-conditions" component={TermsAndConditions} />
        <Route exact  path="/contact" component={Contact} />
        <Route exact  path="/search" component={Search} />
        
        <Route exact  path="/wallet" component={MyWallet} />
        <Route exact  path="/order" component={myOrder} />
         <Route  exact path="/:slug" component={ProductPage} />
         <Route exact  path="/details/:slug" component={ProductDetailsPage} />
         <Route exact  path="/verify-you/:slug" component={VerifyyouPage} />
        

         {/* <Route  path="/cart" component={CartPage} /> */}
      </Switch>
    </Router>
  );
};

<ToastContainer/>
export default App;
