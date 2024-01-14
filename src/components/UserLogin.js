import React, { useState } from "react";
import Link from '@mui/material/Link';
import postApi from "../Model/postApi.js";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addToCart } from "../Actions/cartActions"; 
// import firebase from '../firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';

const UserLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [isSuccess, setIsSuccess] = useState("");


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const sendOtpHandler = () => {
        postApi
            .resend({
                email: email,
            })
            .then(() => {
                setTimeout(() => {
                    history.push(`/verify-you/${email}`)
                }, 2000)
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const doLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await postApi
            .login({
                email: email,
                password: password,
            })
            .then((res) => {
                setIsLoading(false);
                setIsSuccess("Login Successfull");
                setEmail("");
                setPassword("");
                localStorage.removeItem("auth");
                localStorage.setItem("auth", JSON.stringify(res.data));
                dispatch(addToCart("1",res?.data?.access_token));
                setTimeout(() => {
                    history.push('/');
                },1000)
            })
            .catch((err) => {
                setIsLoading(false);
                if (err.response) {
                    if (
                        err.response.data.notification ===
                        "Please verify your acount. If you didn't get OTP, please resend your OTP and verify"
                    ) {
                        sendOtpHandler();
                    } else {
                        setIsLoading(false);
                        setErrors(err.response && err.response.data.errors);
                    }
                } else {
                    return false;
                }
                setIsSuccess("Credentials does not exist");
                console.log(err);
            });
    };

   
    
    const signInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        setIsLoading(true);
        try {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          if(user.email!=""){
          let data = JSON.stringify({
            name:user?.name,
            email: user?.email,
            fcm_token:"web",
            password:"Anki176@",
            deviceid:"web"
          });
          await postApi.googleregister(data).then((res) => {
                setIsLoading(false);
                  setIsSuccess("Login Successfull");
                  localStorage.removeItem("auth");
                  localStorage.setItem("auth", JSON.stringify(res.data));
                  dispatch(addToCart("1",res?.data?.access_token));
                  setTimeout(() => {
                      history.push('/');
                  },1000)
              }).catch((err) => {
                    setIsLoading(false);
                    setIsLoading(false);
                    setErrors(err.response && err.response.data.errors);
              });
        } else {
            setIsSuccess("Credentials does not exist");
        }
          // Handle the signed-in user or perform additional actions
          console.log("this is user dearis",user.email);
        } catch (error) {
          console.error(error.code, error.message);
        }
      };

      
        
      
        const handleSignIn = async () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
          try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            if(user.email!=""){
                let data = JSON.stringify({
                  name:user?.name,
                  email: user?.email,
                  fcm_token:"web",
                  password:"Anki176@",
                  deviceid:"web"
                });
                await postApi.googleregister(data).then((res) => {
                      setIsLoading(false);
                        setIsSuccess("Login Successfull");
                        localStorage.removeItem("auth");
                        localStorage.setItem("auth", JSON.stringify(res.data));
                        dispatch(addToCart("1",res?.data?.access_token));
                        setTimeout(() => {
                            history.push('/');
                        },1000)
                    }).catch((err) => {
                          setIsLoading(false);
                          setIsLoading(false);
                          setErrors(err.response && err.response.data.errors);
                    });
              } else {
                  setIsSuccess("Credentials does not exist");
              }


            console.log('User signed in with Facebook:', user);
          } catch (error) {
            console.error('Error signing in with Facebook:', error);
          }
        };




    return (
        <>
            <section className="osahan-main-body osahan-signin-main">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center vh-100">
                        
                        <div className="col-lg-6 pl-lg-5">
                            <div className="osahan-signin shadow-sm bg-white p-4 rounded">
                                <div className="p-3">
                                    <h2 className="my-0">Welcome Back</h2>
                                    <p className="small mb-4">Sign in to Continue.</p>
                                    {isSuccess ? (
                                        <div class="alert alert-success">
                                            <strong>{isSuccess}!</strong>.
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <form action="">
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email</label>
                                            <input placeholder="Enter Email" type="email" onChange={handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            {errors && Object.hasOwn(errors, "email") ? (
                                                <span className="text-sm mt-1 text-qred">{errors.email[0]}</span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input placeholder="Enter Password" onChange={handlePassword} type="password" className="form-control" id="exampleInputPassword1" />
                                            {errors && Object.hasOwn(errors, "password") ? (
                                                <span className="text-sm mt-1 text-qred">{errors.password[0]}</span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <button type="submit" onClick={doLogin} className="btn btn-success btn-lg rounded btn-block">
                                            {isLoading ? 'Loading...' : 'Sign in'}
                                        </button>
                                    </form>
                                    <p className="text-muted text-center small m-0 py-3">or</p>

                                    <Link onClick={signInWithGoogle} className="btn btn-light border btn-block rounded btn-lg btn-google">
                                        <i className="icofont-google-plus text-danger mr-2"></i> Sign up with Google </Link>
                                    <Link onClick={handleSignIn} className="btn btn-light border btn-block rounded btn-lg btn-google">
                                        <i className="icofont-facebook text-primary mr-2"></i> Sign up with Facebook </Link>
                                       
                                    <p className="text-center mt-3 mb-0">
                                        <Link href="/store-register" className="text-dark">Don't have an account? Sign up</Link>
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
export default UserLogin;
