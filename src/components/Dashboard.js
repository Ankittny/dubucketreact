import React, { useState,useEffect } from "react";
import Link from '@mui/material/Link';

import "react-multi-carousel/lib/styles.css";

const Dashboard = () => {
   const [myprofile,SetProfile] = useState([]);
   
   //console.log(auth);
   useEffect(() => {
      const auth = JSON.parse(localStorage.getItem('auth'));
    SetProfile(auth.user);
   }, []);
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
                        <h6 class="font-weight-bold m-0 mt-2">{myprofile?.name}</h6>
                        <p class="small text-muted m-0"><Link>{myprofile?.email}</Link></p>
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
                  <h4 class="mb-4 profile-title">My account</h4>
                  <div id="edit_profile">
                     <div class="p-0">
                       
                           <div class="form-group">
                              <label for="exampleInputName1">Full Name</label>
                              <input type="text" class="form-control" id="exampleInputName1" value={myprofile?.name} readOnly/>
                           </div>
                           <div class="form-group">
                              <label for="exampleInputNumber1">Mobile Number</label>
                              <input type="number" class="form-control" id="exampleInputNumber1" value={myprofile?.phone} readOnly />
                           </div>
                           <div class="form-group">
                              <label for="exampleInputEmail1">Email</label>
                              <input type="email" class="form-control" id="exampleInputEmail1" value={myprofile?.email} readOnly />
                           </div>
                           {/* <div class="form-group">
                              <label for="exampleInputEmail1">Date Of Birth</label>
                              <input type="date" class="form-control" id="" value={myprofile?.dob} />
                           </div> */}
                           {/* <div class="text-center">
                              <button type="submit" class="btn btn-success btn-block btn-lg">Save Changes</button>
                           </div> */}
                      
                     </div>
                    
                  </div>
               </div>
            </div>
         </div>
      </section>
       
      </>
   );
}
export default Dashboard;