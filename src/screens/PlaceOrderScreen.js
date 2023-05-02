import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost';

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const [selectTerms, setSelectTerms] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  
  const { userInfo } = userLogin;
  

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    // IF ORDER PLACED REDIRECTED TO ORDER DETAIL SCREEN
    if(!userInfo) {
      history.push(`/login`);
    }
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    
  }, [history, dispatch, success, order, userInfo]);
  
  

  const placeOrderHandler = () => {
    
    // GETTING PRODUCT ID AND QUANTITY
    const productIds = cart.cartItems.map((item) => {
      return {
        productId: item.product,
        quantity: item.qty
      };
    })

    // DISPATCHING DATA TO CREATE A PRODUCT
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        productIds: productIds,
      })
    );
  };

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    if(userInfo && cart && cart.itemsPrice) {
      var razorpayData = {
        name: userInfo.name,
        email: userInfo.email,
        number: userInfo.number,
        totalPrice: cart.totalPrice
      }
      const {data} = await axios.post(`/api/orders/razorpay`, razorpayData);
      
  
      const options = {
        key: __DEV__ ? 'rzp_test_V4GGLSjJ4QGPxv' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: 'Sk Home Industry',
        description: 'Payment',
        image: 'https://res.cloudinary.com/dqgo5axpw/image/upload/v1670993573/sk-home-industry/logo_wkscn3.png',
        handler: function (response) {
          // alert(response.razorpay_payment_id)
          // alert(response.razorpay_order_id)
          // alert(response.razorpay_signature)
          // dispatch(payOrder(orderId, response));




          const productIds = cart.cartItems.map((item) => {
            return {
              productId: item.product,
              quantity: item.qty
            };
          })
      
          // DISPATCHING DATA TO CREATE A PRODUCT
          dispatch(
            createOrder({
              orderItems: cart.cartItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              shippingPrice: cart.shippingPrice,
              taxPrice: cart.taxPrice,
              totalPrice: cart.totalPrice,
              productIds: productIds,
              isPaid: true,
              paidAt: Date.now(),
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "COMPLETED",
              }
            })
          );
        },
        prefill: {
          name: data.userName,
          email: data.userEmail,
          phone_number: data.number
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                <p>Pay method: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>₹{item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>₹{cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>₹{cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>₹{cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>₹{cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <Popup trigger={cart.cartItems.length === 0 ? null : (
              cart.paymentMethod === "Razorpay" 
                ? (<button type="submit" onClick={displayRazorpay}>
                  PLACE ORDER
                  </button>
                ) : (
                  null
                )
            )}
                modal>
                  {close => (
                    <div className="popupModal">
                      <button className="popupClose" onClick={close}>
                        &times;
                      </button>
                      <div className="popupHeader"> Terms And Conditions! </div>
                      
                      <div className="popupContentPayment">
                        {' '}
                        <ul>
                          <li>Order cannot be cancelled after shipping.</li>
                          <li>7 days return policy.</li>
                          <li>In case of return amount will be refunded after receiving the product.</li>
                          <li>If the product is damaged, amount will not be refunded.</li>
                        </ul>
                      </div>
                      <hr/>
                      <div className="popupAgree">
                        <input type="checkbox" onClick={() => setSelectTerms(!selectTerms)} /> I agree with all the terms and conditions.
                      </div>
                      <hr/>
                      <div className="popupActions">
                        <button
                          className="popupButton"
                          onClick={() => {
                            console.log('modal closed ');
                            close();
                          }}
                        >
                          NO
                        </button>
                        <div className="popupWrapper">
                          <button
                            onClick={() => {
                              if(selectTerms) {
                                close();
                                displayRazorpay()
                              }
                            }}
                            className={selectTerms ? "popupButton" : "popupButtonDisabled"}
                          >
                            YES
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
            {cart.cartItems.length === 0 
              ? null 
              : cart.paymentMethod === "POD (Pay On Delivery)" 
                ? (
                  <button type="submit" onClick={placeOrderHandler}>
                    PLACE ORDER
                  </button>
                ) : (
                  null
                )
            }
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
