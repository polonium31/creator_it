import React from 'react'
import Image from "../images/Error404.png";
import Logo from "../images/logo.png";
import './styles/error.css'
export const Error = () => {
  return(
    <div className="error-div">
         <div className="text-center">
                <img className="img-fluid" src={Logo} alt="Creator It" id="error-image" />
                <br/>
                <img src={Image} id="error" alt="Error 404" />
              </div>
              
       
    </div>
  )
}
