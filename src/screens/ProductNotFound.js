import React from "react";
import { Link } from "react-router-dom";


const ProductNotFound = () => {
  return (
    <>
     
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">!No Result found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/empty.png"
            alt="Not-found"
          />
          <button className=" hom_button col-md-3 col-sm-6 col-12 btn mt-5">
            <Link to="/"  className="hom_button">
              Home page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductNotFound;
