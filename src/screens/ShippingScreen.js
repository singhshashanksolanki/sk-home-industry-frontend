import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import { useField, useFormik } from "formik"
import { checkoutAdressValidation } from "../schema";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  

const initialValues={
  city:shippingAddress.address,
  address:shippingAddress.city,
  postalCode:shippingAddress.postalCode,
  country:shippingAddress.country,
  
}

 const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
  initialValues:initialValues,
  validationSchema:checkoutAdressValidation,
  onSubmit:({city,address,postalCode,country})=>{
    submitHandler(city,address,postalCode,country)

  }
 })

 


  const dispatch = useDispatch();

  const submitHandler = (city,address,postalCode,country) => {
    
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          
        >
          <h6>DELIVERY ADDRESS</h6>
        <div>
        <input
            type="text"
            placeholder="Enter address"
            name="address"
            id="addresss"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="from-error" >{errors.address}</p>
        </div>

        <div>
        <input
            type="text"
            placeholder="Enter City"
            name="city"
            id="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="from-error" >{errors.city}</p>
        </div>

        <div>
        <input
            type="text"
            placeholder="Enter Postal-code"
            name="postalCode"
            id="postalCode"
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="from-error" >{errors.postalCode}</p>
        </div>
        <div>
        <input
            type="text"
            placeholder="Enter Country"
            name="country"
            id="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="from-error" >{errors.country}</p>
        </div>
         
          
          <button type="button" onClick={handleSubmit}>Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
