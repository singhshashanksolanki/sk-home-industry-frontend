import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation  } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import {Formik, useFormik} from "formik"
import { registration } from "../schema";
import { USER_REGISTER_RESET } from "../Redux/Constants/UserContants";


const Register = ({ location, history }) => {
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

// From validataion fromik
// inital-value 
const initialValues= {
  name :"",
  email:"",
  number:"",
  password:"",
  confirm:""
}

const {values,errors,handleBlur,handleChange,handleSubmit}  = useFormik({
  initialValues:initialValues,
  validationSchema:registration,
   onSubmit:({name ,email ,password, number})=>{
    submitHandler(name,email,password, number);
  }
})

const form={
  transition:"all 0.5s"
}

  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const [message, setMessage] = useState("");
  useEffect(() => {
    if(error) {
      setMessage("");
    }
    const timer = setTimeout(() => {
      if(userInfo && userInfo.message) {
        dispatch({ type: USER_REGISTER_RESET })
      }
    }, 5000)

    return () => clearTimeout(timer);
  }, [userInfo, error])
  const submitHandler = (name,email,password, number) => {
    
    dispatch(register(name, email, password, number));
    if(error===undefined && userInfo){
      setMessage("Email Sent For Verification");
    }
  };

 
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {userInfo && <Message variant="alert-success">{userInfo.message}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-row">
            <Link
              style={myComponentStyle_register}
              onMouseOver={() => {
                setborderbotm_log("2px solid white");
                if (path === "/register") {
                  setborderbotm_reg("2px solid #FF7F50");
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
                if (path === "/register") {
                  setborderbotm_reg("2px solid #FF7F50");
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
            type="text"
            placeholder="Username"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur= {handleBlur}
          />
          <p className="from-error">{errors.name}</p>
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
            type="number"
            placeholder="Contact no"
            id="number"
            name="number"
            value={values.number}
            onChange={handleChange}
            onBlur= {handleBlur}
          />
          <p className="from-error">{errors.number}</p>
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
          <div>
          <input
            type="password"
            placeholder="Comfirm Password"
            id="confirm"
            name="confirm"
            value={values.confirm}
            onChange={handleChange}
            onBlur= {handleBlur}
          />
          <p className="from-error">{errors.confirm}</p>
          </div>
        
          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
