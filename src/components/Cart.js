import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import Loader from './Loader';
import postApi from "../Model/postApi.js";
import CryptoJS from 'crypto-js';
import { useDispatch } from "react-redux";
import { addToCart } from "../Actions/cartActions";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
const Cart = (props) => {
  const dispatch = useDispatch();
  localStorage.setItem('addressid', props.cartItem.addresses[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [cartitem, setCartitem] = useState([]);
  const [Address, setAddress] = useState(props.cartItem.addresses);
  const [sum, setSum] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalsaving, setSaving] = useState(0);
  const [delivery, setDeliveryCharge] = useState(30);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [checksum, setChecksum] = useState('');
  const [orderId, setorderId] = useState('');
  const [UrlButton, setButton] = useState('');
  const [buttnview, setView] = useState(false);

  //set state for address 
  const [name, setName] = useState('');
  const [country, setCountry] = useState('2');
  const [city, setCity] = useState('17');
  const [state, setState] = useState('13');
  const [pincode, setPincode] = useState('');
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);
  const [type, setAddressType] = useState("");

  const [nameerror, SetNameError] = useState("");
  const [mobileerror, SetMobileError] = useState("");
  const [pincoderror, SetPinCodeError] = useState("");
  const [locationerror, SetLocationError] = useState("");
  const [typeerror, SetTypeError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [Addid, setAddid] = useState([]);


  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);


  const removeCartQty = id => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.decrementQyt(id, auth.access_token).then((response) => {
      dispatch(addToCart(id, auth.access_token));
      //console.log("incrimant", response);
      getCartItems();
    }).catch((error) => {
      delleteItem(id);
      console.log('the catch error is ===>', error)
    });
  };
  const delleteItem = id => {
    //alert(id);
    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.deleteCartItem(id, auth.access_token).then((response) => {
      dispatch(addToCart(id, auth.access_token));
      //console.log("incrimant", response);
      getCartItems();
    }).catch((error) => {
      console.log('the catch error is ===>', error)
    });
  };

  const increaseCartQty = (id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.incrementQyt(id, auth.access_token).then((response) => {
      dispatch(addToCart(id, auth.access_token));
      //console.log("incrimant", response);
      getCartItems();
    }).catch((error) => {
      console.log('the catch error is ===>', error)
    });
  };


  const getCartItems = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.GetCart(auth?.access_token).then((res) => {
      if (res.status === 200) {
        setCartitem(res.data.cartProducts);
        // setIsLoading(false);
      }
    }).catch((err) => {
      setCartitem([]);
      console.log("this is test", err);
      localStorage.removeItem('addressid');
      localStorage.removeItem('cartItems');

      window.location.href = "http://localhost:3000/cart";
    });
  }
  useEffect(() => {
    getCartItems();
  }, []);

  //  get total ammount 
  const getTotal = async (cartItems = []) => {
    let sum = 0,
      totalsaving = 0,
      tax = 0,
      discount = 0,
      delivery = 30,
      total = 0,
      subtotal = 0;

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        sum += item.product.offer_price * item?.qty;
        totalsaving += item.product.price * item?.qty;
        total = (sum + tax - discount).toFixed(2);
        subtotal = (sum + tax - discount).toFixed(2);

        if (total < 199) {
          total = (sum + tax + delivery - discount).toFixed(2);
          subtotal = (sum + tax - discount).toFixed(2);
        } else {
          delivery = 0;
        }
      });
    }

    setSum(sum);
    setDiscount(discount);
    setSaving(totalsaving);
    setDeliveryCharge(delivery);
    setTotal(total);
    setSubtotal(subtotal);

    return {
      sum,
      discount,
      totalsaving,
      delivery,
      total,
      subtotal
    };
  };

  useEffect(() => {
    getTotal(cartitem);
  }, [cartitem]);








  const AddSetAddress = (id) => {
    localStorage.setItem('addressid', id);
  }


  const CashOnDelivery = () => {
    setLoadingProductId("1")
    let valuesdata = JSON.stringify({
      shipping_address_id: localStorage.getItem('addressid'),
      billing_address_id: localStorage.getItem('addressid'),
      shipping_method_id: parseInt(1),
      coupon: ""
    });


    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.cashOnDelivery(valuesdata, auth.access_token).then((response) => {
      setLoadingProductId(null);
      localStorage.removeItem('addressid');
      localStorage.removeItem('cartItems')
      window.location.href = "http://localhost:3000/order/success";
    }).catch((error) => {
      console.log('the catch error is ===>', error)
    });

  }


  const handleChangeName = (event) => {
    SetNameError("");
    setName(event.target.value);
  };

  const handleChangeMobile = (event) => {
    SetMobileError("");
    setMobile(event.target.value);
  }

  const handleChangeAddress = (event) => {
    SetLocationError("");
    setLocation(event.target.value)
  }

  const handleChangePin = (event) => {
    SetPinCodeError("");
    setPincode(event.target.value);
  }

  const handleChangetype = (event) => {
    SetTypeError("");
    setAddressType(event.target.value);
  }


  const SaveAddressData = async (e) => {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (name == "") {
      SetNameError("Please enter Full Name");
      return false;
    } if (mobile == "") {
      SetMobileError("Please enter Full Name");
      return false;
    } if (location == "") {
      SetLocationError("Please enter Full Name");
      return false;
    } if (pincode == "") {
      SetPinCodeError("Please enter Full Name");
      return false;
    } if (type == "") {
      SetTypeError("Please Type");
      return false;
    } else {
      SetNameError("");
      SetMobileError("");
      SetLocationError("");
      SetPinCodeError("");
      SetTypeError("");

      const data = JSON.stringify({
        name: name,
        email: auth?.user?.email,
        phone: mobile,
        pincode: pincode,
        address: location,
        type: type,
        country: 2,
        state: 13,
        city: 17
      });
      // console.log(data); // Check the constructed data for correctness
      // Assuming 'auth.access_token' contains the authorization token
      await postApi.saveAddress(auth.access_token, data)
        .then((response) => {
          setMessage(response?.data?.data?.notification);
          const timeout = setTimeout(() => {
            // Reload the page after 3000 milliseconds (3 seconds)
            window.location.reload();
          }, 3000);
          console.log("Response:", response);
          // Handle successful response (if needed)
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error or log the specific error message
        });
    }
  }


  const UpdateAddressData = async (id) => {

    alert(id);
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (name == "") {
      SetNameError("Please enter Full Name");
      return false;
    } if (mobile == "") {
      SetMobileError("Please enter Full Name");
      return false;
    } if (location == "") {
      SetLocationError("Please enter Full Name");
      return false;
    } if (pincode == "") {
      SetPinCodeError("Please enter Full Name");
      return false;
    } if (type == "") {
      SetTypeError("Please Type");
      return false;
    } else {
      SetNameError("");
      SetMobileError("");
      SetLocationError("");
      SetPinCodeError("");
      SetTypeError("");

      const data = JSON.stringify({
        name: name,
        email: auth?.user?.email,
        phone: mobile,
        pincode: pincode,
        address: location,
        type: type,
        country: 2,
        state: 13,
        city: 17
      });
      // console.log(data); // Check the constructed data for correctness
      // Assuming 'auth.access_token' contains the authorization token
      await postApi.updateAddress(id, auth.access_token, data)
        .then((response) => {
          setMessage(response?.data?.data?.notification);
          const timeout = setTimeout(() => {
            // Reload the page after 3000 milliseconds (3 seconds)
            window.location.reload();
          }, 3000);
          console.log("Response:", response);
          // Handle successful response (if needed)
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error or log the specific error message
        });
    }

  }




  const DeleteAddress = async (id) => {
    const element = document.getElementById(`hidecart${id}`);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const confirmDelete = window.confirm('Are you sure you want to delete this data?');
    if (confirmDelete) {
      await postApi.deleteAddress(id, auth.access_token)
        .then((response) => {
          element.style.display = 'none';
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error or log the specific error message
        });
    } else {
      // Handle cancellation or do nothing
    }

  }

  const HandlerEdit = (id) => {
    setShow1(true);
    const auth = JSON.parse(localStorage.getItem('auth'));
    postApi.editAddress(id, auth.access_token).then((response) => {

      setAddid(response?.data.address.id);
      setName(response?.data.address.name);
      setPincode(response?.data.address.pincode);
      setMobile(response?.data.address.phone);
      setAddressType(response?.data.address.type);
      setLocation(response?.data.address.address);
      // setEditAddress(response?.data.address);
      //window.location.href = "http://localhost:3000/order/success";
    }).catch((error) => {
      console.log('the catch error is ===>', error)
    });
  }



  const paytmConfig = {
    root: "", // Your root URL
    style: {
      "bodyBackgroundColor": "#fafafb",
      // ... other style configurations
    },
    data: {
      orderId: orderId, // Unique order ID
      token: checksum, // Use the obtained checksum here
      amount: total, // Amount in INR
      // Add other required data for the transaction
    },
    payMode: {
      // Payment mode configurations
    },
    website: "DEFAULT", // Your website name
    flow: "DEFAULT", // Payment flow
    merchant: {
      mid: "rdhmwY94015910450327", // Your merchant ID
      redirect: false,
    },
    handler: {
      transactionStatus: function (data) {


        setLoadingProductId("1")
        let data1 = JSON.stringify({
          shipping_address_id: localStorage.getItem('addressid'),
          billing_address_id: localStorage.getItem('addressid'),
          transactionid: data.BANKTXNID,
          shipping_method_id: parseInt(1),
          coupon: ""
        });
        const auth = JSON.parse(localStorage.getItem('auth'));
        postApi.PaywithPhonepe(data1, auth.access_token).then((response) => {

          localStorage.removeItem('addressid');
          localStorage.removeItem('cartItems')
          window.location.href = "http://localhost:3000/order/success";

          // console.log("this is test,",response);
        }).catch((error) => {
          console.log('the catch error is ===>', error)
        });

        console.log('Transaction status:', data);
        // Handle transaction status callback
      },
      notifyMerchant: function (eventName, data) {
        console.log('Notify merchant:', eventName, data);
        // Handle merchant notification callback
      },
    },
  };




  const initiatePayment = async () => {
    try {
      const response = await axios.get(`https://paytm.kiddostyles.com/webApitest.php?price=${total}`);
      const { txnToken, orderid } = response.data;
      setChecksum(txnToken);
      setorderId(orderid);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  useEffect(() => {
    initiatePayment();
  }, [total]);

  const handlePaytmPayment = () => {

    if (window.Paytm && window.Paytm.CheckoutJS) {

      window.Paytm.CheckoutJS.init(paytmConfig)
        .then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.error('Error initializing Paytm payment:', error);
        });
    } else {
      console.error('Paytm CheckoutJS not available');
    }
  };






  return (
    <>
      <section className="py-4 osahan-main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="accordion" id="accordionExample">
                <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden">
                  <div className="card-header bg-white border-0 p-0" id="headingOne">
                    <h2 className="mb-0">
                      <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span className="c-number">1</span> Cart ({cartitem?.length} items) </button>
                    </h2>
                  </div>
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body p-0 border-top">
                      <div className="osahan-cart">


                        {cartitem.map((cartitems) => (
                          <div className="cart-items bg-white position-relative border-bottom">
                            {/* <Link href="product_details.html" className="position-absolute">
                          <span className="badge badge-danger m-3">10%</span>
                        </Link> */}
                            <div className="d-flex  align-items-center p-3">
                              <Link href={`details/${cartitems?.product?.slug}`}>
                                <img src={process.env.REACT_APP_API_ENDPOINT + cartitems?.product?.thumb_image} className="img-fluid" />
                              </Link>
                              <Link href="#" className="ml-3 text-dark text-decoration-none w-100">
                                <h5 className="mb-1">{cartitems?.product?.name}</h5>
                                <p className="text-muted mb-2">
                                  <del className="text-success mr-1">₹ {cartitems?.product?.price}</del> ₹ {cartitems?.product?.offer_price}
                                </p>
                                <div className="d-flex align-items-center">
                                  <p className="total_price font-weight-bold m-0">{cartitems?.product?.unitkg}</p>
                                  <form id='myform' className="cart-items-number d-flex ml-auto">
                                    <input onClick={() => removeCartQty(cartitems?.id)} type='button' value='-' className='qtyminus btn btn-success btn-sm' field='quantity' />
                                    <input type='text' name='quantity' value={cartitems?.qty} className='qty form-control' />
                                    <input onClick={() => increaseCartQty(cartitems?.id)} type='button' value='+' className='qtyplus btn btn-success btn-sm' field='quantity' />
                                  </form>
                                </div>
                              </Link>
                            </div>
                          </div>

                        ))}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
                  <div className="card-header bg-white border-0 p-0" id="headingtwo">
                    <h2 className="mb-0">
                      <div className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                        <span className="c-number">2</span> Order Address <Link href="#" onClick={handleShow} className="text-decoration-none text-success ml-auto">
                          <i className="icofont-plus-circle mr-1"></i>Add New Delivery Address </Link>
                      </div>
                    </h2>
                  </div>

                  <div className="card-body p-0 border-top">
                    <div className="osahan-order_address">
                      <div className="p-3 row">



                        {Address.map((Addseritems) => (

                          <div className="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio" id={`hidecart${Addseritems?.id}`}>
                            {Addseritems.default_shipping === 1 ? (
                              <input type="radio" id={"customRadioInline" + Addseritems?.id} name="customRadioInline1" className="custom-control-input" onClick={() => AddSetAddress(Addseritems.id)} checked />
                            ) : (
                              <input type="radio" id={"customRadioInline" + Addseritems?.id} name="customRadioInline1" className="custom-control-input" onClick={() => AddSetAddress(Addseritems.id)} />

                            )}
                            <label className="custom-control-label w-100" for={"customRadioInline" + Addseritems?.id}>
                              <div>
                                <div className="p-3 bg-white rounded shadow-sm w-100">
                                  <div className="d-flex align-items-center mb-2">
                                    <p className="mb-0 h6">{Addseritems?.type}</p>
                                    <p className="mb-0 badge badge-success ml-auto">
                                      {Addseritems.default_shipping === 1 ? (
                                        <>
                                          <i className="icofont-check-circled"></i> Default
                                        </>
                                      ) : (
                                        <>
                                          <Link onClick={() => HandlerEdit(Addseritems?.id)} className="text-decoration-none text-info"> <i class="icofont-pencil-alt-5"></i></Link>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <p className="small text-muted m-0">{Addseritems?.address}</p>
                                  <p className="small text-muted m-0">{Addseritems?.country?.name} {Addseritems?.country_state?.name} {Addseritems?.city?.name} Pincode {Addseritems?.pincode}</p>
                                  <p className="pt-2 m-0 text-right">
                                    {Addseritems.default_shipping === 1 ? (

                                      <Link className="text-decoration-none text-info"><i class="icofont-check-circled"></i></Link>

                                    ) : (
                                      <span className="small">
                                        <Link onClick={() => DeleteAddress(Addseritems.id)} className="text-decoration-none text-info"><i class="icofont-ui-delete"></i></Link>
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <span onClick={() => AddSetAddress(Addseritems.id)} className="btn btn-light border-top btn-lg btn-block"> Deliver Here </span>
                              </div>
                            </label>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>

                </div>


              </div>
            </div>
            <div className="col-lg-4">
              <div className="sticky_sidebar">
                <div className="bg-white rounded overflow-hidden shadow-sm mb-3 checkout-sidebar">

                  <div>
                    <div className="bg-white p-3 clearfix">
                      <p className="font-weight-bold small mb-2">Bill Details</p>
                      <p className="mb-1">Item Total <span className="small text-muted">({cartitem?.length} item)</span>
                        <span className="float-right text-dark">₹ {subtotal}</span>
                      </p>
                      <p className="mb-1">Store Charges <span className="float-right text-dark">₹ 0</span>
                      </p>
                      <p className="mb-3">Delivery Fee <span data-toggle="tooltip" data-placement="top" title="Delivery partner fee - $3" className="text-info ml-1">
                        <i className="icofont-info-circle"></i>
                      </span>
                        <span className="float-right text-dark">₹ {delivery}</span>
                      </p>
                      <h6 className="mb-0 text-success">Total Discount <span className="float-right text-success">₹ {discount + (totalsaving - subtotal)}</span>
                      </h6>
                    </div>
                    <div className="p-3 border-top">
                      <h5 className="mb-0">TO PAY <span className="float-right text-danger">₹ {total}</span>
                      </h5>
                    </div>


                  </div>

                </div>
                <Link class="btn btn-success btn-lg btn-block mt-3 mb-3" onClick={handlePaytmPayment} disabled={isLoading}>
                  {isLoading ? 'Initializing Payment...' : 'Pay Now'}</Link>


                <Link style={{ color: "white" }} onClick={CashOnDelivery} class="btn btn-success btn-lg btn-block mt-3 mb-3" disabled={loadingProductId === "1"}>{loadingProductId === "1" ? 'Loading...' : 'Cash On Delivery'}</Link>
                <p className="text-success text-center">Your Total Savings on this order ₹ {discount + (totalsaving - subtotal)}</p>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show}>
          <Modal.Header>
            <h5 class="modal-title" id="exampleModalLabel">Add Delivery Address</h5>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-body">
              {message}
              <div class="form-row">
                {/* <div class="col-md-12 form-group">
                           <label class="form-label">Delivery Area</label>
                           <div class="input-group">
                              <input placeholder="Delivery Area" type="text" class="form-control" />
                              <div class="input-group-append"><button id="button-addon2" type="button" class="btn btn-outline-secondary"><i class="icofont-pin"></i></button></div>
                           </div>
                        </div> */}
                <div class="col-md-12 form-group"><label class="form-label">Full Name</label><input placeholder="Enter Name" onChange={handleChangeName} type="text" class="form-control" />
                  <span style={{ color: "red" }}>{nameerror}</span>
                </div>
                <div class="col-md-12 form-group"><label class="form-label">Mobile No.</label><input placeholder="Enter Mobile No." onChange={handleChangeMobile} type="text" class="form-control" />
                  <span style={{ color: "red" }}>{mobileerror}</span>
                </div>
                <div class="col-md-12 form-group"><label class="form-label">City</label><input placeholder="Enter City" type="text" class="form-control" Value="Modinagr (GZB)" readOnly /></div>
                <div class="col-md-12 form-group"><label class="form-label">State</label><input placeholder="Complete Address e.g. house number, street name, landmark" value="Utter Pradesh" type="text" class="form-control" readOnly /></div>
                <div class="col-md-12 form-group"><label class="form-label">Full Address</label><input placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" onChange={handleChangeAddress} type="text" class="form-control" />
                  <span style={{ color: "red" }}>{locationerror}</span>

                </div>
                <div class="col-md-12 form-group">
                  <label class="form-label">PinCode</label>
                  <select className="form-control" onChange={handleChangePin}>
                    <option value="">Select PinCode</option>
                    <option value="201201">201201</option>
                    <option value="201204">201204</option>
                  </select>
                  <span style={{ color: "red" }}>{pincoderror}</span>

                </div>

                <div class="mb-0 col-md-12 form-group">

                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="home" /> Home
                  </label>&nbsp; &nbsp;
                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="office" /> Office
                  </label>&nbsp; &nbsp;
                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="other" /> Other
                  </label>
                  <span style={{ color: "red" }}>{typeerror}</span>

                </div>

              </div>

            </div>


          </Modal.Body>
          <Modal.Footer className="modal-footer p-0 border-0">
            <div class="col-6 m-0 p-0">
              <button type="button" onClick={handleClose} class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
            </div>
            <div class="col-6 m-0 p-0">
              <button type="button" onClick={SaveAddressData} class="btn btn-success btn-lg btn-block">Save changes</button>
            </div>

          </Modal.Footer>
        </Modal>
        <Modal show={show1}>
          <Modal.Header>
            <h5 class="modal-title" id="exampleModalLabel">Add Delivery Address</h5>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-body">
              {message}
              <div class="form-row">
                {/* <div class="col-md-12 form-group">
                           <label class="form-label">Delivery Area</label>
                           <div class="input-group">
                              <input placeholder="Delivery Area" type="text" class="form-control" />
                              <div class="input-group-append"><button id="button-addon2" type="button" class="btn btn-outline-secondary"><i class="icofont-pin"></i></button></div>
                           </div>
                        </div> */}
                <div class="col-md-12 form-group"><label class="form-label">Full Name</label><input placeholder="Enter Name" onChange={handleChangeName} type="text" class="form-control" value={name} />
                  <span style={{ color: "red" }}>{nameerror}</span>
                </div>
                <div class="col-md-12 form-group"><label class="form-label">Mobile No.</label><input placeholder="Enter Mobile No." onChange={handleChangeMobile} type="text" class="form-control" value={mobile} />
                  <span style={{ color: "red" }}>{mobileerror}</span>
                </div>
                <div class="col-md-12 form-group"><label class="form-label">City</label><input placeholder="Enter City" type="text" class="form-control" Value="Modinagr (GZB)" readOnly /></div>
                <div class="col-md-12 form-group"><label class="form-label">State</label><input placeholder="Complete Address e.g. house number, street name, landmark" value="Utter Pradesh" type="text" class="form-control" readOnly /></div>
                <div class="col-md-12 form-group"><label class="form-label">Full Address</label><input placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" onChange={handleChangeAddress} type="text" class="form-control" value={location} />
                  <span style={{ color: "red" }}>{locationerror}</span>

                </div>
                <div class="col-md-12 form-group">
                  <label class="form-label">PinCode</label>
                  <select value={pincode} className="form-control" onChange={handleChangePin}>
                    <option value="">Select PinCode</option>
                    <option value="201201">201201</option>
                    <option value="201204">201204</option>
                  </select>
                  <span style={{ color: "red" }}>{pincoderror}</span>

                </div>

                <div class="mb-0 col-md-12 form-group">

                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="home" checked={type === "home"} /> Home
                  </label>&nbsp; &nbsp;
                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="Office" checked={type === "Office"} /> Office
                  </label>&nbsp; &nbsp;
                  <label class="radio-inline">
                    <input type="radio" onChange={handleChangetype} name="optradio" value="other" checked={type === "other"} /> Other
                  </label>
                  <span style={{ color: "red" }}>{typeerror}</span>

                </div>

              </div>

            </div>


          </Modal.Body>
          <Modal.Footer className="modal-footer p-0 border-0">
            <div class="col-6 m-0 p-0">
              <button type="button" onClick={handleClose1} class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
            </div>
            <div class="col-6 m-0 p-0">
              <button type="button" onClick={() => UpdateAddressData(Addid)} class="btn btn-success btn-lg btn-block">Save changes</button>
            </div>

          </Modal.Footer>
        </Modal>



      </section>
    </>
  );
}
export default Cart;