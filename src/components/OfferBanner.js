// import React, { useState, useEffect } from "react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const OfferBanner = (props) => {
   const responsive = {
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: 1,
         slidesToSlide: 4, // optional, default to 1.
      },
      tablet: {
         breakpoint: { max: 1024, min: 464 },
         items: 2,
         slidesToSlide: 4, // optional, default to 1.
      },
      mobile: {
         breakpoint: { max: 3000, min: 0 },
         items: 1,
         slidesToSlide: 4, // optional, default to 1.
      },
   };


   return (
      <>
         { /* <div class="d-flex align-items-center mb-3">
            <h5 class="m-0">Promos for you</h5>
            <Link href="" class="ml-auto btn btn-outline-success btn-sm">See more</Link>
         </div> */ }
         
         <div className="py-3 osahan-promos">
            <Carousel
               responsive={responsive}
               showIndicators={false}
               autoPlay={true}
               infiniteLoop={true}
               showArrows={false}
            >
               {props.BannerDATA.map((object, index) => (
                  <div className="osahan-slider-item mx-5">
                  <img src={process.env.REACT_APP_API_ENDPOINT+"/"+object.image} className="img-fluid mx-auto rounded" alt={object.image} />
                  </div>

               ))}
            </Carousel>
         </div>


      </>
   );
}
export default OfferBanner;
