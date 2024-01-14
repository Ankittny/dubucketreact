import React, { useState } from "react";

import Link from '@mui/material/Link';
import "../Model/postApi.js";
import postApi from "../Model/postApi.js";
import { useHistory } from 'react-router-dom';

const StoreRegisterPage = () => {
  const history = useHistory();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setCheck] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  // set state 
  const handleFname = (e) => {
    setFname(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleAgree = (e) => {
    setCheck(e.target.value);
  }


  const doSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await postApi
      .signup({
        name: fname,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        agree: checked ? 1 : "",
        phone: phone ? phone : ''
      })
      .then((res) => {
        setIsLoading(false);
        setIsSuccess(res.data.notification);
        setTimeout(() => {
          // history.push(`/verify-you/${email}`)
        }, 2000)
        setFname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCheck(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(err.response && err.response.data.errors);
      });
  };

  return (
    <>
      <section className="osahan-main-body">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center vh-100">
           
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
                      <label for="exampleInputName1">Name</label>
                      <input placeholder="Enter Name"
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        aria-describedby="emailHelp"
                        onChange={handleFname}
                      />
                      {errors && Object.hasOwn(errors, "name") ? (
                        <span className="text-sm mt-1 text-qred">{errors.name[0]}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label for="exampleInputNumber1">Phone Number</label>
                      <input placeholder="Enter Phone Number"
                        type="number"
                        className="form-control"
                        id="exampleInputNumber1"
                        aria-describedby="emailHelp"
                        onChange={handlePhone}
                      />
                      {errors && Object.hasOwn(errors, "phone") ? (
                        <span className="text-sm mt-1 text-qred">{errors.phone[0]}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email</label>
                      <input placeholder="Enter Email"
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleEmail}
                      />
                      {errors && Object.hasOwn(errors, "email") ? (
                        <span className="text-sm mt-1 text-qred">{errors.email[0]}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input placeholder="Enter Password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={handlePassword}
                      />
                      {errors && Object.hasOwn(errors, "password") ? (
                        <span className="text-sm mt-1 text-qred">
                          {errors.password[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword2">Confirmation Password</label>
                      <input placeholder="Enter Confirmation Password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        onChange={handleConfirmPassword}
                      />
                      {errors && Object.hasOwn(errors, "password") ? (
                        <span className="text-sm mt-1 text-qred">
                          {errors.password[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="form-check">
                      <input onChange={handleAgree}
                        className="form-check-input"
                        type="checkbox" value="1"
                        id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
                        agree all terms and condition in dubucket
                      </label>
                    </div>
                    <button type="submit" onClick={doSignup} className="btn btn-success rounded btn-lg btn-block">
                      {isLoading ? 'Loading...' : 'Create Account'}
                    </button>
                  </form>
                  <p className="text-muted text-center small py-2 m-0">or</p>
                  <p className="text-center mt-3 mb-0">
                    <Link href="/login" className="text-dark">Already have an account! Sign in</Link>
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
export default StoreRegisterPage;
