import React, { useState,useEffect } from "react";
import postApi from "../Model/postApi.js";
import Link from '@mui/material/Link';
const Footer = ()  => {
const [socialItem,setSocial] = useState([]);
const [links,setLinks] = useState([]);

useEffect(()  => {
 postApi.SocialIcon().then((res) =>{
      //console.log(res?.data?.links)
      setSocial(res?.data?.links);
  }).catch((err) => {
      console.log("this is error =>>>>",err)
  });
}, []);

useEffect(()  => {
   postApi.categorys().then((res) =>{
        setLinks(res?.data?.categories);
        //console.log("this is test",links);
    }).catch((err) => {
        console.log("this is error =>>>>",err)
    });
  }, []);

  const groupSize = 6;
  const groupedLinks = Array.from(
    { length: Math.ceil(links.length / groupSize) },
    (_, index) => links.slice(index * groupSize, (index + 1) * groupSize)
  );
console.log(groupedLinks);

    return (
        <>
       
         <footer className="section-footer border-top bg-white">
            {/* <section className="footer-top py-4">
               <div className="container">
                  <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                     <div className="col-md-4">
                        <form>
                           <div className="input-group">
                              <input type="text" placeholder="Email" className="form-control" name="" />
                              <span className="input-group-append">
                                 <button type="submit" className="btn btn-success"> Subscribe</button>
                              </span>
                           </div>
                        </form>
                     </div>
                     <div className="col-md-8 text-md-right">
                        <Link href="#" className="btn btn-icon btn-light"><i className="icofont-facebook"></i></Link>
                        <Link href="#" className="btn btn-icon btn-light"><i className="icofont-twitter"></i></Link>
                        <Link href="#" className="btn btn-icon btn-light"><i className="icofont-instagram"></i></Link>
                        <Link href="#" className="btn btn-icon btn-light"><i className="icofont-youtube"></i></Link>
                     </div>
                  </div>
               </div>
            </section> */}
            <section className="footer-main border-top pt-5 pb-4">
               <div className="container">
                  <div className="row d-flex justify-content-center" >
                     <aside className="col-md">
                        <h6 className="title">Useful Links</h6>
                        <ul className="list-unstyled list-padding">
                           <li> <Link href="/about" className="text-dark">About</Link></li>
                           <li> <Link href="/contact" className="text-dark">Contact</Link></li>
                           <li> <Link href="/privacy" className="text-dark">Privacy Policy</Link></li>
                           <li> <Link href="/terms-and-conditions" className="text-dark">Terms And Conditions</Link></li>
                           
                        </ul>
                     </aside>

                     {/* <h6 className="title">Category</h6> */}
                     {groupedLinks.map((group, groupIndex) => (
                     <aside className="col-md">
                        
                       
                           <ul className="list-unstyled list-padding" key={groupIndex}>
                              {group.map((link, linkIndex) => (
                                 <li key={linkIndex}> <Link href={link.slug} className="text-dark">{link?.name}</Link></li>
                              ))}
                           </ul>
                        
                     </aside>
                     ))}
                     
                     <aside className="col-md">
                        {/* <h6 className="title">Extra Pages</h6> */}
                        <ul className="list-unstyled list-padding">
                           <li><Link href="https://play.google.com/store/apps/details?id=com.dubucket&pcampaignid=web_share" target="_blanck"><img src="../assets/img/playmarket.png" height="30" alt="not found" /></Link></li>
                           {socialItem.map((objectitem) => (
                             <Link href={objectitem?.link} target="_blanck" className="btn btn-icon btn-light"><i className={objectitem?.icon}></i></Link>
                           ))}
                         
                     
                        
                        </ul>
                     </aside>
                  </div>
               </div>
            </section>
            <section className="footer-bottom border-top py-4">
               <div className="container-fluid">
                  <div className="row" style={{ display: 'flex', justifyContent: 'center' }} >
                     <div className="col-md-6">
                        <span className="pr-2">© 2024 Dubucket food & bevrage</span>
                        {/* <span className="pr-2"><a href="privacy.html" className="text-dark">Privacy</a></span>
                        <span className="pr-2"><a href="terms%26conditions.html" className="text-dark">Terms & Conditions</a></span> */}
                     </div>
                     <div className="col-md-6 text-md-right">
                        <Link><img src="../assets/img/payment.png" height="30" alt="not found" /></Link>
                     </div>
                  </div>
               </div>
            </section>

         </footer>
        </>
    );
}
export default Footer;