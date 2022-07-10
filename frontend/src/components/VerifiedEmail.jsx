import React from 'react'
import Image from "../images/logo.png";
import EmailIMG from "../images/VerifiedEmail.gif";
import { NavLink } from "react-router-dom";
import "./styles/emailverify.css"
export const VerifiedEmail = () => {
  return (
    <>

      <div className="container main ">
        <div className="row d-flex justify-content-start align-items-center" >
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-3">
            <div className="text-center">
              <img className="img-fluid" src={Image} alt="Creator It" id="image" style={{ width: "45%" }} />
            </div>
            <br />
            <div className="verify-div" >
            <br />
              <h1 className="text-center " style={{ color: "#000000" }}>Your Email has been Verified !!!!</h1>
              
              <div className="text-center">
              <img className="img-fluid" src={EmailIMG} alt="Creator It" id="image" style={{ width: "50%"}} />
            </div>
            <div className="register mt-2 text-center">
                  <NavLink to="/login"  className="btn btn-dark btn-lg" style={{paddingLeft:"5%",paddingRight:"5%",fontSize:"24px"}}>Login</NavLink>
                </div>
                <br />
            </div>
            <br />
          </div>

        </div>

      </div>
    </>

  )
}