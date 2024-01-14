import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";



const About = () => {
    const [aboutitem, setAbout] = useState([]);
    useEffect(() => {
        postApi.about().then((res) => {
            if (res.status === 200) {
                setAbout(res.data);
                // setIsLoading(false);
            }
        }).catch((err) => {
            setAbout([]);
            console.log(err);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Dubucket Food & Beverage - Fast Delivery About</title>
            </Helmet>
            <Header />
            <section className="py-1 osahan-main-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 p-4   shadow-sm">
                            <div className="osahan-home-page">
                                <div className="osahan-body">
                                    <section class="py-2 osahan-main-body">
                                        <div class="container-fluid">
                                            <div class="row">
                                               <div class="col-md-6 col-sm-6 col-lg-6">
                                                    <img src={process.env.REACT_APP_API_ENDPOINT + aboutitem?.aboutUs?.banner_image} alt="this is test"/ > 
                                               </div>
                                               <div class="col-md-6 col-sm-6 col-lg-6">
                                                  {/* <h2>About US </h2> */}

                                                   <div dangerouslySetInnerHTML={{__html: aboutitem?.aboutUs?.description}}  />
                                                  
                                               </div>
                                                
                                            </div>
                                        </div>
                                    </section>

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
export default About;
