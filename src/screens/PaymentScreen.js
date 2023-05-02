import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error ,setError] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  !shippingAddress && history.push("/shipping");
  const submitHandler = (event) => {
    event.preventDefault();
    paymentMethod && dispatch(savePaymentMethod(paymentMethod));
    paymentMethod && history.push("/placeorder");
    !paymentMethod && setError(true)
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container" onChange={(e) => setPaymentMethod(e.target.value)}>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id= "pod"
                value="POD (Pay On Delivery)"
              />
              <label className="form-check-label" htmlFor="pod">POD (Pay on Delivery)</label>
            </div>
            {/* <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div> */}
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                id="razerpay"
                name="paymentMethod"
                value="Razorpay"              />
              <label className="form-check-label" htmlFor="razerpay">Razorpay</label>
            </div>
          </div>
         { error && !paymentMethod &&<p className="text-danger text-start"> Payment mode required</p>}
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
