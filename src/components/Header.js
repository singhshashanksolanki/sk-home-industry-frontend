import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../components/LoadingError/Toast";

const ToastObjects = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  toastId: "info"
  // pauseOnFocusLoss: false,
  // draggable: false,
  // pauseOnHover: false,
  // autoClose: 2000,
};

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword) {
      if (keyword) {
        
        history.push(`/search/${keyword.trim()}`);
      } else {
        history.push("/");
      }
    } 
    else{
      toast.info("Enter Something To Search", ToastObjects);
      // const notify = () => toast.info("Enter Something To Search", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   toastId: "info"
      //   });;
      // notify();
    };
    
  };
  return (
    <>
      <Toast />
      <div>
        {/* Top Header */}
        <div className="Announcement ">
          <div className="container">
            <div className="row">
              {/* <div className="col-md-6 d-flex align-items-center display-none headerLeftSide">
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />          
                <p >+91 8494090499</p>
                <p>shashanksinghsolanki1@gmail.com</p>
              </div> */}
              <div className=" col-12 col-lg-12 r justify-content-center d-flex align-items-center">
                <Link to="">
                  <i className=" col fab fa-facebook-f"></i>
                </Link>
                <Link to="">
                  <i className=" col fab fa-instagram"></i>
                </Link>
                <Link to="">
                  <i className=" col fab fa-linkedin-in"></i>
                </Link>
                <Link to="">
                  <i className=" col fab fa-youtube"></i>
                </Link>
                <Link to="">
                  <i className=" col fab fa-pinterest-p"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="header">
          <div className="container">
            {/* MOBILE HEADER */}
            <div className="mobile-header">
              <div className="container ">
                <div className="row ">
                  <div className="col-6 d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                      <img alt="logo" src="/images/logo.png" />
                    </Link>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                    {userInfo ? (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-user"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>

                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={logoutHandler}
                          >
                            Logout
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/orders"
                          >
                            Orders
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-user"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/login">
                            Login
                          </Link>

                          <Link className="dropdown-item" to="/register">
                            Register
                          </Link>
                        </div>
                      </div>
                    )}

                    <Link to="/cart" className="cart-mobile-icon">
                      <i className="fas fa-shopping-bag"></i>
                      <span className="badge">{cartItems.length}</span>
                    </Link>
                  </div>
                  <div className="col-12 d-flex align-items-center">
                    <form onSubmit={submitHandler} className="input-group">
                      <input
                        type="search"
                        className="form-control rounded search"
                        placeholder="Search"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <button type="submit" className="search-button">
                        search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* PC HEADER */}
            <div className="pc-header">
              <div className="row">
                <div className="col-md-3 col-4 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-md-6 col-8 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Hi, {userInfo.name}
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="/orders"
                          >
                            Orders
                          </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link to="/register">Register</Link>
                      <Link to="/login">Login</Link>
                    </>
                  )}

                  <Link to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
