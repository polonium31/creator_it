import React from 'react'
import Image from "../images/logo.png";
import EmailIMG from "../images/VerifiedEmail.gif";
import { NavLink } from "react-router-dom";
import "./styles/emailverify.css"
export const VerifiedEmail = () => {
  return (
    <>
<div class="d-flex justify-content-center">
        <div className="col-lg-8 offset-lg-0 col-md-8 offset-md-2">
          <br />
          <div className="text-center">
            <img className="img-fluid" src={Image} alt="Creator It" id="image" style={{ width: "45%" }} />
          </div>
          <br />
          <div className="verify-div" >
            <br />
            <h1 className="text-center " style={{ color: "#000000" }}>Please Check your Email for the <br />Verification Link !!! </h1>
            <br />
            <div className="text-center">
              <img className="img-fluid" src={EmailIMG} alt="Creator It" id="image" style={{ width: "40%" }} />
            </div>
            <div className="register mt-2 text-center">
                  <NavLink to="/login"  className="btn btn-dark btn-lg" style={{paddingLeft:"5%",paddingRight:"5%",fontSize:"24px"}}>Login</NavLink>
                </div>
            <br />
          </div>
        </div>
      </div>
    </>

  )
}