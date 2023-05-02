import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder, cancelOrder } from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { ORDER_PAY_RESET, ORDER_CANCELLED_RESET } from "../Redux/Constants/OrderConstants";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";


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

const OrderScreen = ({ match }) => {

  
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const { id } = useParams();
  const orderId = id;
  const dispatch = useDispatch();
  let componentRef = useRef();
  
  const [returnDate, setReturnDate] = useState({
    orderDate: 0,
    finalDate: 0,
  })

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  // CANCEL ORDER
  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancelled, success: successCancelled } = orderCancel;

  
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
    
    useEffect(() => {
      if(order) {
        // let date = new Date();
        // let getD = new Date(order.paidAt);
        // let updatedObject = {
        //   orderDate: Date.UTC(
        //     getD.getFullYear(),
        //     getD.getMonth(),
        //     getD.getDate(),
        //     getD.getHours(),
        //     getD.getMinutes(),
        //     getD.getSeconds(),
        //     getD.getMilliseconds()
        //   ),
        //   finalDate: orderDate + (7 *1000 * 60 * 60 * 24),
        // }
        // setReturnDate({
        //   ...returnDate,
        //   ...updatedObject,
        // })
        // console.log(returnDate);
        if(order._id !== id) {
          // let date = new Date();
          // let getD = new Date(order.paidAt);
          // let updatedObject = {
          //   orderDate: Date.UTC(
          //     getD.getFullYear(),
          //     getD.getMonth(),
          //     getD.getDate(),
          //     getD.getHours(),
          //     getD.getMinutes(),
          //     getD.getSeconds(),
          //     getD.getMilliseconds()
          //   ),
          //   finalDate: date.getTime() + (5 *1000 * 60 * 60 * 24),
          // }
          // setReturnDate({
          //   ...returnDate,
          //   ...updatedObject,
          // })
          // console.log(returnDate);
          dispatch(getOrderDetails(orderId));
        }
      }
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (!order || successPay || successCancelled) {
        dispatch({ type: ORDER_CANCELLED_RESET })
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
      if(successCancelled) {
        console.log(successCancelled);
      }
    }, [dispatch, orderId, successPay,  successCancelled, order, returnDate]);
    
    const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderId, paymentResult));
    };

    // CANCELLING ORDER
    const cancelOrdreHandler=()=>{

      // GETTING PRODUCT ID AND QUANTITY
      const productData = order.orderItems.map((item) => {
      return {
        productId: item.product,
        quantity: item.qty
      };
      })

      // DISPATCHING CANCEL ORDER REQUEST
      dispatch(cancelOrder(order, productData))
      
      
    }
    
    async function displayRazorpay() {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
  
      const {data} = await axios.post(`/api/orders/razorpay/${orderId}`);
      

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
          dispatch(payOrder(orderId, response));
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


  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
          
            <div >
            <div className="row  order-detail order_box" >
            {/* button of cancel order */}
              {/* {order.status !== "Cancelled" && !order.isPaid ? (<><div
                onClick={() => cancelOrdreHandler()}
                className="cancle-button d-flex justify-content-center align-items-center"
              >
                <i className="fas fa-times"></i>
              </div>
              
              </>
              ) : <></>} */}
              <Popup trigger={order.status !== "Cancelled" && order.status !== "Shipped" ? (<div
                onClick={() => cancelOrdreHandler()}
                className="cancle-button d-flex justify-content-center align-items-center"
              >
                <i className="fas fa-times"></i>
              </div>
              ) : <></>} 
                modal>
                  {close => (
                    <div className="popupModal">
                    <button className="popupClose" onClick={close}>
                      &times;
                    </button>
                    <div className="popupHeader"> Alert! </div>
                    <div className="popupContent">
                      {' '}
                      Are you sure you want to cancel this order?
                  </div>
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
                    <button className="popupButton" onClick={() => cancelOrdreHandler()}>YES</button>
                  </div>
                    
                    </div>
                  )}
                </Popup>

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
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
                    <p>Shipping: {order.shippingAddress.country}</p>
                    <p>Pay method: {order.paymentMethod}</p>
                    {order.paymentMethod !== "POD (Pay On Delivery)" ? (
                      order.isPaid ? (
                        <div className="bg-info p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Paid on {moment(order.paidAt).calendar()}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-danger p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Not Paid
                          </p>
                        </div>
                      )
                    ) : (
                      <></>
                    )}
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
                      Address: {order.shippingAddress.city},{" "}
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Delivered on {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {order.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
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
                      <td>₹{order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>₹{order.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>₹{order.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>₹{order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {order.paymentMethod !== "POD (Pay On Delivery)" && order.status !== "Cancelled" ? (
                  !order.isPaid ? (
                    order.paymentMethod === "PayPal" ? (
                      <div className="col-12">
                        {loadingPay && <Loading />}
                        {!sdkReady ? (
                          <Loading />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="col-12">
                        <button onClick={displayRazorpay}>Pay With Razorpay</button>
                      </div>
                    )
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                <hr></hr>
                <Popup trigger={order.status === "Delivered" && returnDate.orderDate <= returnDate.finalDate ? (
                      <div className="col-12">
                        <button onClick={displayRazorpay}>Pay With Razorpay</button>
                      </div>
              ) : <></>} 
                modal>
                  {close => (
                    <div className="popupModal">
                    <button className="popupClose" onClick={close}>
                      &times;
                    </button>
                    <div className="popupHeader"> Alert! </div>
                    <div className="popupContent">
                      {' '}
                      Are you sure you want to cancel this order123?
                  </div>
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
                    <button className="popupButton" onClick={() => cancelOrdreHandler()}>YES</button>
                  </div>
                    
                    </div>
                  )}
                </Popup>
                <ReactToPrint
                  trigger={() => {
                    return <button><MDBIcon fas icon="print" color="primary" className="me-1" />Print Receipt</button>
                  }}
                  content = {() => componentRef.current}
                  documentTitle="Order Receipt"        
                />
              </div>
              
            </div>
            </div><br/>
            {/* <MDBCol xl="1" className="float-end">
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0"
                >
                  <MDBIcon fas icon="print" color="primary" className="me-1" />
                  Print
                </MDBBtn>
                  <br/>
              </MDBCol> */}
            {/* Section To Print */}
            <div class="print-source" ref={componentRef} >
            <MDBContainer className="py-5">
              <MDBCard className="p-4">
                <MDBCardBody>
                  <MDBContainer className="mb-2 mt-3">
                    <MDBRow className="d-flex align-items-baseline">
                      <MDBCol xl="9">
                        <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                          Invoice &gt; &gt; <strong>ID: {order._id}</strong>
                        </p>
                      </MDBCol>
                      {/* <MDBCol xl="3" className="float-end">
                        <MDBBtn
                          color="light"
                          ripple="dark"
                          className="text-capitalize border-0"
                        >
                          <MDBIcon fas icon="print" color="primary" className="me-1" />
                          Print
                        </MDBBtn>
                        <MDBBtn
                          color="light"
                          ripple="dark"
                          className="text-capitalize border-0 ms-2"
                        >
                          <MDBIcon
                            far
                            icon="file-pdf"
                            color="danger"
                            className="me-1"
                          />
                          Export
                        </MDBBtn>
                        <hr />
                      </MDBCol> */}
                    </MDBRow>
                  </MDBContainer>
                  <MDBContainer>
                    <MDBCol md="12" className="text-center">
                      <MDBIcon
                        fab
                        icon="mdb"
                        size="4x"
                        className="ms-0 "
                        style={{ color: "#5d9fc5" }}
                      />
                      <img src="https://res.cloudinary.com/dqgo5axpw/image/upload/v1677222431/sk-home-industry/logo_2_tj7snx.png" alt="Sk Home Industry" height="100" />
                      <p className="pt-0">Sk Home Industry</p>
                    </MDBCol>
                  </MDBContainer>
                  <MDBRow>
                    <MDBCol xl="8">
                      <MDBTypography listUnStyled>
                        <li className="text-muted">
                          To: <span style={{ color: "#5d9fc5" }}>{order.user.name}</span>
                        </li>
                        <li className="text-muted">{order.shippingAddress.address}</li>
                        <li className="text-muted">{order.shippingAddress.city}, {order.shippingAddress.country}</li>
                        <li className="text-muted">{order.shippingAddress.postalCode}</li>
                        <li className="text-muted">
                          <MDBIcon fas icon="phone-alt" /> {order.user.number}
                        </li>
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol xl="4">
                      <p className="text-muted">Invoice</p>
                      <MDBTypography listUnStyled>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">ID: </span>{order._id}
                        </li>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Creation Date: </span>{order.createdAt}
                        </li>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Status:</span>
                          {order.status !== "Cancelled" && !order.isPaid && <div className="ms-1" style={{background: "#ffd11a", color: "black", borderRadius: "10px", display: "inline-block", width: "90px", padding: "5px 5px 5px 15px" }}>
                          <span className=" fw-bold" style={{color: "black"}}>
                            Unpaid
                          </span>
                          </div>}
                          {order.status !== "Cancelled" && order.isPaid && <div className="ms-1" style={{background: "lightgreen", color: "black", borderRadius: "10px", display: "inline-block", width: "80px", padding: "5px 5px 5px 20px" }}>
                          <span className=" fw-bold" style={{color: "black"}}>
                            Paid
                          </span>
                          </div>}
                          {order.status === "Cancelled" && <div className="ms-1" style={{background: "red", borderRadius: "10px", display: "inline-block", width: "190px", padding: "5px 5px 5px 20px" }}>
                          <span className=" fw-bold" style={{color: "white"}}>
                            Cancelled & {order.isPaid ? "Paid" : "Unpaid"}
                          </span>
                          </div>}
                        </li>
                        {order.isPaid && <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Payment Id: </span>{order.paymentResult.id}
                        </li>}
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="my-2 mx-1 justify-content-center">
                    <MDBTable striped borderless>
                      <MDBTableHead
                        className="text-white"
                        style={{ backgroundColor: "#84B0CA" }}
                      >
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {order.orderItems.map((item, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td><img src={item.image} alt="Product Image" height="100" /></td>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>₹{item.price}</td>
                              <td>₹{item.price * item.qty}</td>
                            </tr>
                          )
                        })}
                        {/* <tr>
                          <th scope="row">1</th>
                          <td>Pro Package</td>
                          <td>4</td>
                          <td>$200</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Web hosting</td>
                          <td>1</td>
                          <td>$10</td>
                          <td>$10</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Consulting</td>
                          <td>1 year</td>
                          <td>$300</td>
                          <td>$300</td>
                        </tr> */}
                      </MDBTableBody>
                    </MDBTable>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol xl="8">
                      {/* <p className="ms-3">
                        Add additional notes and payment information
                      </p> */}
                    </MDBCol>
                    <MDBCol xl="3">
                      <MDBTypography listUnStyled>
                        {/* <li className="text-muted ms-3">
                          <span class="text-black me-4">SubTotal</span>$1110
                        </li> */}
                        <li className="text-muted ms-2 mt-2">
                          <span class="text-black me-3">Subtotal</span>₹{order.itemsPrice}
                        </li>
                        <li className="text-muted ms-2 mt-2">
                          <span class="text-black me-3">Tax(15%)</span>₹{order.taxPrice}
                        </li>
                        <li className="text-muted ms-2 mt-2">
                          <span class="text-black me-3">Shipping</span>₹{order.shippingPrice}
                        </li>
                      </MDBTypography>
                      <p className="text-black float-start">
                        <span className="text-black me-3" style={{ fontSize: "20px" }}> Total</span>
                        <span style={{ fontSize: "20px" }}>₹{order.totalPrice}</span>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol xl="10">
                      <p>Thank you for your purchase</p>
                    </MDBCol>
                    {/* <MDBCol xl="2">
                      <MDBBtn
                        className="text-capitalize"
                        style={{ backgroundColor: "#60bdf3" }}
                      >
                        Pay Now
                      </MDBBtn>
                    </MDBCol> */}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
            </div>
            
            {/* <PrintOrderPage ref={componentRef} /> */}
          </>
        )}
      </div>
    </>
  );
};




export default OrderScreen;
