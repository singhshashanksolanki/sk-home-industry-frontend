import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { resetPassword } from "./../Redux/Actions/userActions";
import { Formik, useFormik } from "formik";
import { resetPasswordSchemaValidation } from "../schema";
import NotFound from "./NotFound";
import axios from "axios";

const ResetPasswordScreen = ({ location, history }) => {
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
  password:"",
  confirmPassword:"",
}
// Fromik valication
const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
  initialValues:initialValues,
  validationSchema:resetPasswordSchemaValidation,
  onSubmit:(password)=>{
    submitHandler(password, param.id)
  }
})
const form={
  transition:"all 0.5s"
}
  window.scrollTo(0, 0);
  const path = useLocation().pathname;

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [validUrl, setValidUrl] = useState(false);

  const param = useParams();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, success, userInfo: message, error} = userPasswordReset;

  useEffect(() => {
    // if (userInfo) {
    //   history.push(redirect);
    // }

    if(message) {
      console.log(message)
    }
    const verifyEmailUrl = async() => {
        try {
            const url = `/api/users/${param.id}/resetPassword/${param.token}`;
            const {data} = await axios.get(url);
            console.log(data)
            setValidUrl(true)
        } catch(error) {
            // if(data) {

            //   console.log()
            // }
            console.log(error)
            setValidUrl(false)
        }
    };

    verifyEmailUrl();
  }, [message, history, redirect, validUrl, param, success]);

  const submitHandler = (password, id) => {
    console.log(password,confirmPassword)
    dispatch(resetPassword({password: password, id: id}));
  };

  return (
    <>
      {
        validUrl ? (
          success ? (
            <div className="emailContainer">
                <img src="https://res.cloudinary.com/dqgo5axpw/image/upload/v1677091065/sk-home-industry/success_uclnvv.png" alt="success_img" className="successImage" />
                <h1>Password Reset Successfully</h1>
                <Link to="/login">
                    <button className="greenButton">Login</button>
                </Link>
            </div>
          ) : (
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
                <h1>New Password</h1>
              <input
                type="password"
                placeholder="Create New Password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur= {handleBlur}
              />
              <p className="from-error">{errors.password}</p>
              </div>
              <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur= {handleBlur}
              />
              <p className="from-error">{errors.confirmPassword}</p>
              </div>
              <button type="button" onClick={handleSubmit}>Change Password</button>
            </form>
          </div>            
          )
        )
        : (
          <NotFound />
          
        )
      }
      
    </>
  );
};

export default ResetPasswordScreen;
