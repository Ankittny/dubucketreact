import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ProducSearch from '../components/ProducSearch.js';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";
import Loader from './Loader';

const Search = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [SearchData, setSearch] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const searchdata = params.get('search');
    
    useEffect(() => {
        postApi.SearchData(searchdata).then((res) => {
            if (res.status === 200) {
                console.log(res.data.products);
                setSearch(res.data.products);
                setIsLoading(false);
            }
        }).catch((err) => {
            setSearch([]);
            console.log(err);
        });
    }, [searchdata]);

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
                              <title>Dubucket-Search</title>
                            </Helmet>
                            <ProducSearch ProductList={SearchData}/>
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
export default Search;
