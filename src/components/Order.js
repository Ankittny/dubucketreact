import React,{useState,useEffect} from "react";
import Link from '@mui/material/Link';
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-bootstrap/Modal';

import postApi from "../Model/postApi";

const Order =  () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const [orders,SetOrder] = useState([]);


  useEffect(() => {
    postApi.orders(auth.access_token).then((response) => {
        if(response.status==200){
            SetOrder(response.data.orders);
        } else {
            SetOrder([]);
        }
        
      }).catch((error) => {
        console.log('the catch error is ===>', error)
    });
  }, []);

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const statuses = {
    0: 'Pending',
    1: 'In progress',
    2: 'On the way',
    3: 'Completed',
    4: 'Rejected',
    // Add more statuses if needed
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  const handelItemModal = (orderid) =>{


    postApi.ordersshow(orderid,auth.access_token).then((response) => {
        if(response.status==200){
           console.log(response)
        } else {
            console.log("this is empty");
        }
        
      }).catch((error) => {
        console.log('the catch error is ===>', error)
    });
    setShow(true);
  }

  const Logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('addressid');
    localStorage.removeItem('cartItems');
    window.location.href = '/';
 }
   return (
      <>
       <section class="py-4 osahan-main-body">
         <div class="container">
            <div class="row">
               <div class="col-lg-4">
                  <div class="osahan-account bg-white rounded shadow-sm overflow-hidden">
                     <div class="p-4 profile text-center border-bottom">
                        {/* <img src="img/user.png" class="img-fluid rounded-pill" /> */}
                        <h6 class="font-weight-bold m-0 mt-2">{auth?.user?.name}</h6>
                        <p class="small text-muted m-0"><Link>{auth?.user?.email}</Link></p>
                     </div>
                     <div class="account-sections">
                        <ul class="list-group">
                        
                        <Link href="/myaccount" class="text-decoration-none text-dark">
                              <li class="border-bottom bg-white d-flex align-items-center p-3">
                                 <i class="icofont-ui-user osahan-icofont bg-warning"></i>Account
                                 <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                              </li>
                           </Link>
                           <Link href="/order" class="text-decoration-none text-dark">
                              <li class="border-bottom bg-white d-flex align-items-center p-3">
                                 <i class="icofont-chart-pie-alt osahan-icofont bg-dark"></i>My Order
                                 <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                              </li>
                           </Link>
                           <Link href="/wallet" class="text-decoration-none text-dark">
                              <li class="border-bottom bg-white d-flex align-items-center p-3">
                              
                                 <i class="icofont-rupee osahan-icofont bg-primary"></i>My Wallet
                                 <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                              </li>
                           </Link>
                           
                           {/* <a href="help_ticket.html" class="text-decoration-none text-dark">
                              <li class="border-bottom bg-white d-flex align-items-center p-3">
                                 <i class="icofont-phone osahan-icofont bg-success"></i>Ticket
                                 <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                              </li>
                           </a> */}
                           <Link onClick={Logout} class="text-decoration-none text-dark">
                              <li class="border-bottom bg-white d-flex  align-items-center p-3">
                                 <i class="icofont-lock osahan-icofont bg-danger"></i> Logout
                              </li>
                           </Link>
                        </ul>
                    
                     </div>
                  </div>
               </div>
               <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
               <div class="order-body">
                    {orders.map((orderItem) => (
                        <div class="pb-3">
                           <Link onClick={() => handelItemModal(orderItem?.order_id)} class="text-decoration-none text-dark" title="view all item">
                              <div class="p-3 rounded shadow-sm bg-white">
                                 <div class="d-flex align-items-center mb-3">

                                    <p class="bg-success text-white py-1 px-2 mb-0 rounded small">{statuses[orderItem?.order_status]}</p>
                                    <p class="text-muted ml-auto small mb-0"><i class="icofont-clock-time"></i> {formatDate(orderItem?.created_at)}</p>
                                 </div>
                                 <div class="d-flex">
                                    <p class="text-muted m-0">Transaction. ID<br/>
                                       <span class="text-dark font-weight-bold">{orderItem?.order_id}</span>
                                    </p>
                                    <p class="text-muted m-0 ml-auto">Shipping Method<br/>
                                       <span class="text-dark font-weight-bold">{orderItem?.payment_method}</span>
                                      
                                    </p>
                                    <p class="text-muted m-0 ml-auto">Total Item<br/>
                                       <span class="text-dark font-weight-bold">{orderItem?.product_qty}</span>
                                      
                                    </p>
                                    <p class="text-muted m-0 ml-auto">Total Payment<br/>
                                       <span class="text-dark font-weight-bold">₹ {orderItem?.total_amount}</span>
                                    </p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                    ))}
                        
                     </div>
               
               </div>
            </div>
         </div>

         <Modal show={show}>
          <Modal.Header>
            <h5 class="modal-title" id="exampleModalLabel">Item List</h5>
          </Modal.Header>
          <Modal.Body>
          <div className="osahan-order_address">
                      <div className="p-3 row">



                       

                          <div className="custom-control col-lg-12 custom-radio mb-12 position-relative border-custom-radio" >
                          
                              <input type="radio"  name="customRadioInline1" className="custom-control-input" checked />
                           
                              
                            <label className="custom-control-label w-100" for={"customRadioInline"}>
                              <div>
                                <div className="p-3 bg-white rounded shadow-sm w-100">
                                  <div className="d-flex align-items-center mb-2">
                                    <p className="mb-0 h6">home</p>
                                   
                                  </div>
                                  <p className="small text-muted m-0">vijayanagar gali no.1</p>
                                  <p className="small text-muted m-0">india up ghazadinagd modinagar</p>
                                  <p className="pt-2 m-0 text-right">
                                 
                                  </p>
                                </div>
                              
                              </div>
                            </label>
                          </div>
                      </div>
                    </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer p-0 border-0">
            <div class="col-12 m-0 p-0">
              <button type="button" onClick={handleClose} class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
            </div>
            

          </Modal.Footer>
        </Modal>


      </section>
      </>
   );
}
export default Order;