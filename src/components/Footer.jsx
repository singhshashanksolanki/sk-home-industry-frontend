import React from "react";
import "./footer.css"
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex data">
       <div className="_1info" style={{flex:"6"}}>
       <h1 className="h">About us</h1>
        <p className="pra">Vision  :- To create a brand that is  synonymous with natural high quality incense sticks that promote wellness and mindfulness. Additionally the company could aim to became a leader in the industry by using sustainable materials and environment friendly practices.</p>
       </div>
       <div className="_2contact" style={{flex:"3"}}>
       <h1 className="h">Contact Us</h1>
        <ul>
           <li><a href="tel:8494090499">+91 7770821989</a></li>
           <li><a href="mailto:shashanksinghsolanki1@gmail.com">sachet0985@gmail.com</a></li>
           
        </ul>
        <div className="justify-content-center d-flex" >
        <Link to="">
                <i className=" col fab fa-facebook-f" style={{padding:"30px" ,color:"black"}}></i>
              </Link>
              <Link to="">
                <i className=" col fab fa-instagram" style={{padding:"30px",color:"black"}}></i>
              </Link>
              <Link to="">
                <i className=" col fab fa-linkedin-in" style={{padding:"30px",color:"black"}}></i>
              </Link>
              <Link to="">
                <i className=" col fab fa-youtube"style={{padding:"30px",color:"black"}}></i>
              </Link>
              
        </div>
       </div>
      </div>
    </div>
  );
};

export default Footer;
