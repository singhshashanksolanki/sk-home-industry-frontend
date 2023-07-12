import React from "react";
import "./footer.css"
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex data">
       <div className="_1info" style={{flex:"6"}}>
       <h1 className="h">About us</h1>
        <p className="pra"><b>Vision</b>  :- To create a brand that is  synonymous with natural high quality incense sticks that promote wellness and mindfulness. Additionally the company could aim to became a leader in the industry by using sustainable materials and environment friendly practices.</p>
        <p className="pra"><b>Mission</b> - To use all available tools to provide our manufacturers, dealers, and other suppliers of the goods and services the Company consumes a fair economic and social bargain.                                                                                                                                          By pursuing professionalism in all aspects of business, to assume the greatest level of client satisfaction.</p>
        <p className="pra">For over two decades, SK Home Industry has been committed to creating natural, high-quality incense sticks that promote relaxation, mindfulness, and wellness. Since our founding in 1999, we've been dedicated to using only the finest natural ingredients to create our products, and we've always put the safety and well-being of our customers first. Over the years, we've grown and evolved, but our commitment to quality and sustainability has never wavered. Today, we're proud to be a leader in the industry, and we continue to innovate and improve our products to better serve our customers. We're grateful for your support and loyalty over the years, and we look forward to many more years of providing you with the best natural incense sticks on the market.</p>
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
