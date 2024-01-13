import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import ProductDetails from '../components/ProductDetails.js';
import RelatedProducts from '../components/RelatedProducts.js';
import Footer from '../components/Footer.js';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from './Loader';
import axios from "axios";


const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [ProductDetail, setProduct] = useState([]);
  const [CategoryData, setCategory] = useState([]);
  const [RelatedData, setRelated] = useState([]);
  const [TotalReciewQty, setTotalReciewQty] = useState([]);
  const [Gellery, setGellery] = useState([]);
  const [ActiveVariants, setActiveVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/product/${slug}`)
      .then((response) => {
        //console.log(response.data);
        if (response.status === 200 || response.status === 201 || response.status === 'ok') {
          if (response.data.relatedProducts.length > 0) {
            setRelated(response.data.relatedProducts);
          }

          if (response.data.product !== "") {
            setIsLoading(false); // loading false
            setTotalReciewQty(response.data.totalProductReviewQty);
            setCategory(response.data.product.category);
            setProduct(response.data.product);
            setGellery(response.data.gellery);
            setActiveVariants(response.data.product.active_variants[0].active_variant_items);
          }
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
        <div className="container">
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
                              <title>Dubucket-{ProductDetail?.seo_title}</title>
                              <meta name="description" content={ProductDetail.seo_description} />
                          </Helmet>
                          <ProductDetails ProductDetail={ProductDetail} TotalReciewQty={TotalReciewQty} gallery={Gellery} CategoryName={CategoryData} ActiveVariants={ActiveVariants} />
                          <RelatedProducts RelatedData={RelatedData} />
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
export default ProductDetailsPage;
