import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import ProductList from '../components/ProductList.js';
import Footer from '../components/Footer.js';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from './Loader';
import axios from "axios";



const ProductPage = () => {
  const { slug } = useParams();
  const [ProductData, setProduct] = useState([]);
  const [CategoryData, setCategory] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(`/product-by-category/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.category != null) {
            setCategory(response.data.category);
          }
          if (response.data.products.length > 0) {
              setProduct(response.data.products);
              setIsLoading(false); // loading false
          }

          // console.log(response.data.products);
        } else {
          alert("false");
        }
      })
      .catch((error) => {
        console.log('the catch error is ===>', error)
      })
  }, [slug]);


  return (
    <>
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
                    } else {
                      return (
                        <>
                          <Helmet>
                            <title>Dubucket-{CategoryData?.name}</title>
                            <link rel="canonical" href={process.env.REACT_APP_API_ENDPOINT+'/'+CategoryData?.slug} />
                          </Helmet>
                          <ProductList CategoryData={CategoryData} ProductList={ProductData}/>
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
export default ProductPage;
