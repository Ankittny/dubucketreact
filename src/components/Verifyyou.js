import React, { useState } from "react";

import Link from '@mui/material/Link';
import "../Model/postApi.js";
import postApi from "../Model/postApi.js";
import { useHistory } from 'react-router-dom';

const Verifyyou = (props) => {
    const history = useHistory();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState("");
    // set state 
    const handleOtp = (e) => {
        setOtp(e.target.value);
    };
    const doVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await postApi
          .verification(
            {
              email: props.EmailId,
            },
            otp
          )
          .then((res) => {
            setIsLoading(false);
            if (res) {
                setIsSuccess(res.data.notification);
                setTimeout(() => {
                    history.push('/login');
                  }, 2000)
            }
          })
          .catch((err) => {
            setIsLoading(false);
            if (err.response) {
              if (err.response.data.notification) {
                setIsSuccess(err.response.data.notification);
              } else {
                return false;
              }
            } else {
              return false;
            }
          });
      };

    return (
        <>
            <section className="osahan-main-body">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center vh-100">
                        <div className="landing-page shadow-sm bg-success col-lg-6">
                            <Link className="position-absolute btn-sm btn btn-outline-light m-4 zindex" href="/">Skip <i className="icofont-bubble-right"></i>
                            </Link>
                            <div className="osahan-slider m-0">
                                <div className="osahan-slider-item text-center">
                                    <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
                                        <i className="icofont-sale-discount display-1 text-warning"></i>
                                        <h4 className="my-4 text-white">Best Prices & Offers</h4>
                                        <p className="text-center text-white-50 mb-5 px-4">Cheaper prices than your local <br />supermarket, great cashback offers to top it off. </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 pl-lg-5">
                            <div className="osahan-signup shadow bg-white p-4 rounded">
                                <div className="p-3">
                                    <h2 className="my-0">Let's get started</h2>
                                    <p className="small mb-4">Create account to see our top picks for you!</p>

                                    {isSuccess ? (
                                        <div class="alert alert-success">
                                            <strong>{isSuccess}!</strong>.
                                        </div>
                                    ) : (
                                        ""
                                    )}


                                    <form action="#">



                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Enter OTP</label>
                                            <input placeholder="Enter OTP"
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                onChange={handleOtp}
                                            />
                                           
                                        </div>

                                        <button type="submit" onClick={doVerify} className="btn btn-success rounded btn-lg btn-block">
                                            {isLoading ? 'Loading...' : 'Verify'}

                                        </button>
                                    </form>
                                    <p className="text-muted text-center small py-2 m-0">or</p>
                                    <p className="text-center mt-3 mb-0">
                                        <Link href="signin.html" className="text-dark">Already have an account! Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Verifyyou;
