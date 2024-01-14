import React, { useState, useEffect } from "react";
import OfferBanner from "../components/OfferBanner.js";
import TopList from "../components/TopList.js";
import Category from "../components/Category.js";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Loader from './Loader';
import { Helmet } from "react-helmet";
import axios from "axios";


const Home = () => {
  const [CategoryData, setCategory] = useState([]);
  const [BannerData, setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('/')
      .then((response) => {
        if(response.status === 200) {
          setIsLoading(false); // loading false
          setCategory(response.data.homepage_categories)
          setbestProducts(response.data.bestProducts);
          if (response.data.sliderVisibilty === true) {
            setBanner(response.data.sliders);
          }
        } else {
          alert("false");
        }
      })
      .catch((error) => {
        console.log('the catch error is ===>', error)
      })
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
            <div className="col-lg-12 col-md-12 com-sm-12">
              <div className="osahan-home-page">
                <div className="osahan-body">
                  {(() => {
                    if (isLoading === true) {
                      return (
                        < Loader />
                      )
                    } else {
                      return (
                        <>
                          <OfferBanner BannerDATA={BannerData} />
                          <Category CategoryDATA={CategoryData} />
                          <TopList bestProducts={bestProducts} />
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
export default Home;
