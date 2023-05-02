import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { login, logout } from "./../Redux/Actions/userActions";
 import { Formik, useFormik } from "formik";
 import {loginSchemaValidation} from "../schema"
import { USER_LOGOUT } from "../Redux/Constants/UserContants";
const Login = ({ location, history }) => {
  const [borderbtm_log, setborderbotm_log] = useState("4px solid white");
  const [borderbtm_reg, setborderbotm_reg] = useState("4px solid white");
  const myComponentStyle_register = {
    color:"#c03f10",
    backgroundColor: "white",
    display:"inline-block",
    borderBottom:borderbtm_reg,
    width:"100%",
    height:"50px",
    transition:"all 0.4s"

  
   
}
const myComponentStyle_login = {
    color:"#c03f10",
    backgroundColor: "white",
    display:"inline-block",
    borderBottom:borderbtm_log,
    width:"100%",
    height:"50px",
    transition:"all 0.4s"

  
   
}


// from inistial values 
const initialValues={
  email:"",
  password:""
}
// Fromik valication
const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
  initialValues:initialValues,
  validationSchema:loginSchemaValidation,
  onSubmit:(email ,passwrod)=>{
   submitHandler(email ,passwrod)
  }
})
const form={
  transition:"all 0.5s"
}
  // window.scrollTo(0, 0);
  const path = useLocation().pathname;

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    const timer = setTimeout(() => {
      if(error) {
        dispatch({ type: USER_LOGOUT })
      }
    }, 5000)

    return () => clearTimeout(timer);
  }, [userInfo, history, redirect, error]);

  const submitHandler = ({email, password}) => {
    console.log(email,password)
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
        
        >
          <div className="d-flex flex-row">
            <Link
              style={myComponentStyle_register}
              onMouseOver={() => {
                setborderbotm_log("2px solid white");
                if (path === "/login") {
                  setborderbotm_log("2px solid #FF7F50");
                } else {
                  setborderbotm_reg("2px solid white");
                }
              }}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>

            <Link
              style={myComponentStyle_login}
              onMouseOver={() => {
                // setborderbotm_log("2px solid #FF7F50");
                setborderbotm_reg("2px solid white");
                if (path === "/login") {
                  setborderbotm_log("2px solid #FF7F50");
                } else {
                  setborderbotm_reg("2px solid white");
                }
              }}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Login
            </Link>
          </div>
          <div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur= {handleBlur}
          />
          <p className="from-error">{errors.email}</p>
          </div>
          <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur= {handleBlur}
          />
          <p className="from-error">{errors.password}</p>
          </div>
          <button type="button" onClick={handleSubmit}>Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
          <p>
            <Link
              to={redirect ? `/resetPasswordEmail?redirect=${redirect}` : "/resetPasswordEmail"}
            >
              Forget Password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
