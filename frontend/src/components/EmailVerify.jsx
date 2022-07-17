import React from 'react'
import Image from "../images/logo.png";
import EmailIMG from "../images/Verifyemail.gif";
import "./styles/emailverify.css"
export const EmailVerify = () => {
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
              <img className="img-fluid" src={EmailIMG} alt="Creator It" id="image" style={{ width: "35%" }} />
            </div>
            <br />
          </div>
        </div>
      </div>
    </>


  )
}