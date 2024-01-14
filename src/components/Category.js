import React from "react";
import Link from '@mui/material/Link';

const Category = (props) => {

    return (
        <>
            <div className="pt-3 pb-2  osahan-categories">
                <div className="d-flex align-items-center mb-2">
                    {/* <h5 className="m-0">What do you looking for?</h5> */}
                    {/* <Link href="#" className="ml-auto btn btn-outline-success btn-sm">See more</Link> */}
                </div>

                <div className="categories-slider row">
                    {props.CategoryDATA.map((object, index) => (

                         <div class="col-c">
                                 <div class="bg-white shadow-sm rounded text-center my-2 px-2 py-3 c-it">
                                 <Link href={object.slug}>
                                 <img src={process.env.REACT_APP_API_ENDPOINT + "/" + object.image} className="img-fluid px-2 mx-auto" alt="not found" />
                                       <p class="m-0 pt-2 text-muted text-center">{object?.name}</p>
                                    </Link>
                                 </div>
                              </div>
                       
                            
                        
                    ))}
                </div>
            </div>
        </>
    );
}
export default Category;