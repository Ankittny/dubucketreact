import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";



const Privacy = () => {
    const [Policyitem, setPolicy] = useState([]);
    useEffect(() => {
        postApi.privacypolicy().then((res) => {
            if (res.status === 200) {
                setPolicy(res.data);
                // setIsLoading(false);
            }
        }).catch((err) => {
            setPolicy([]);
            console.log(err);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Dubucket Food & Beverage - Fast Delivery privacy policy</title>
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
                                               
                                               <div class="col-md-12 col-sm-12 col-lg-12">
                                                  {/* <h2>About US </h2> */}

                                                   <div dangerouslySetInnerHTML={{__html: Policyitem?.privacyPolicy?.privacy_policy}}  />
                                                  
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
export default Privacy;
