import React, { useState, useEffect } from "react";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import postApi from "../Model/postApi.js";
import { Helmet } from "react-helmet";



const Contact = () => {
    const [Contact, setContact] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [improve, setImprove] = useState('');
    const [text, setText] = useState('');
    const [errorname, SetNameError] = useState('');
    const [errorphone, SetPhoneError] = useState('');
    const [erroremail, SetEmailError] = useState('');
    const [errorimprove, SetImproveeError] = useState('');
    const [errortext, SettextError] = useState('');
    const [loadingProductId, setLoadingProductId] = useState(null);
    useEffect(() => {
        postApi.contactUs().then((res) => {
            if (res.status === 200) {
                setContact(res.data);
                // setIsLoading(false);
            }
        }).catch((err) => {
            setContact([]);
            console.log(err);
        });
    }, []);



    const handleName = (event) => {
      SetNameError("");
      setName(event.target.value);
    };

    const handleEmail = (event) => {
        SetEmailError("");
        setEmail(event.target.value);
    };
    const handlePhone = (event) => {
        SetPhoneError("");
        setPhone(event.target.value);
    };
    const handleImprove = (event) => {
        SetImproveeError("");
        setImprove(event.target.value);
    };
    const handleText = (event) => {
        SettextError("");
        setText(event.target.value);
    };

const DoSubmit = () =>{
    setLoadingProductId("1")
    if(name==""){
        SetNameError("Enter Name Please");
    }
    if(phone==""){
        SetPhoneError("Enter Contact Number Please");
    }
    if(email==""){
        SetEmailError("Enter Email Please");
    }
    if(improve==""){
        SetImproveeError("Enter Improve text Please");
    }
    if(text==""){
        SettextError("Enter message Please");
    } else{

        const data =  {
            "name":name,
            "email":email,
            "phone":phone,
            "subject":improve,
            "message":text
        }
        postApi.contact(data).then((res) => {
            if (res.status === 200) {
                setName("");
                setPhone("");
                setEmail("");
                setImprove("");
                setText("");
                setLoadingProductId(null);
            }
        }).catch((err) => {
            setContact([]);
            console.log(err);
        });
    }
}


    return (
        <>
            <Helmet>
                <title>Dubucket Food & Beverage - Fast Delivery Contact</title>
            </Helmet>
            <Header />
            <section className="py-1 osahan-main-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 p-4   shadow-sm">
                            <div className="osahan-home-page">
                                <div className="osahan-body">
                                    <section class="py-4 osahan-main-body">
                                        <div class="container-fluid">
                                            <div class="row">

                                                <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                                                    <h4 class="mb-4 profile-title">{Contact?.contact?.title}</h4>
                                                    <div id="edit_profile">
                                                        <div class="p-0">
                                                           
                                                                <div class="form-group">
                                                                    <label for="exampleInputName1">Full Name</label>
                                                                    <input onChange={handleName} type="text" placeholder="Enter Full Name" value={name} class="form-control" id="exampleInputName1" />
                                                                    <span style={{color:'red'}}>{errorname}</span>
                                                                </div>
                                                               
                                                                <div class="form-group">
                                                                    <label for="exampleInputEmail1">Email</label>
                                                                    <input onChange={handleEmail} type="email" placeholder="Enter Email" value={email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <span style={{color:'red'}}>{erroremail}</span>

                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="exampleInputName1">Full Name</label>
                                                                    <input onChange={handlePhone} type="number" placeholder="Enter Contact N0." value={phone} class="form-control" id="exampleInputName1" />
                                                                    <span style={{color:'red'}}>{errorphone}</span>

                                                                </div>
                                                                
                                                                <div class="form-group">
                                                                    <label for="exampleInputPassword1">How can we improve</label>
                                                                    <input onChange={handleImprove} type="text" placeholder="can we improve?" value={improve} class="form-control" id="exampleInputHelp1" />
                                                                    <span style={{color:'red'}}>{errorimprove}</span>

                                                                </div>

                                                                <div class="form-group">
                                                                    <label for="exampleInputPassword1">Type Text</label>
                                                                    <textarea onChange={handleText} type="text" placeholder="Type Text?" value={text}  class="form-control" id="exampleInputHelp1" ></textarea>
                                                                    <span style={{color:'red'}}>{errortext}</span>

                                                                </div> 

                                                                <button onClick={DoSubmit} type="submit" class="btn btn-success btn-lg btn-block" disabled={loadingProductId === "1"}>{loadingProductId === "1" ? 'Loading...' : 'Submit'}</button>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="osahan-account bg-white rounded shadow-sm overflow-hidden">
                                                        <div class="p-4 profile text-center border-bottom">
                                                            <h6 class="font-weight-bold m-0 mt-2">{Contact?.contact?.title}</h6>
                                                        </div>
                                                        <div class="account-sections">

                                                            <ul class="list-group">

                                                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                                    <i class="icofont-email osahan-icofont bg-danger"></i> {Contact?.contact?.email}
                                                                    
                                                                    <span class="badge badge-success p-1 badge-pill ml-auto"></span>
                                                                </li>


                                                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                                    <i class="icofont-phone osahan-icofont bg-success"></i>{Contact?.contact?.phone}
                                                                    <span class="badge badge-success p-1 badge-pill ml-auto"></span>
                                                                </li>


                                                                


                                                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                                    <i class="icofont-info osahan-icofont bg-primary"></i>{Contact?.contact?.description}
                                                                    <span class="badge badge-success p-1 badge-pill ml-auto"></span>
                                                                </li>
                                                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                                    <i class="icofont-address-book osahan-icofont bg-dark"></i>{Contact?.contact?.address}
                                                                    <span class="badge badge-success p-1 badge-pill ml-auto"></span>
                                                                </li>


                                                               

                                                              

                                                            </ul>
                                                        </div>
                                                    </div>
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
export default Contact;
