import React from 'react'
import { NavLink } from "react-router-dom";
import Image from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faAt, faLock, faSignature, faCameraRetro} from "@fortawesome/free-solid-svg-icons";
import "./styles/signup.css"
export const SignUp = () => {
    return (
        <>
        
            <div className="container main">
                <div className="row d-flex justify-content-start align-items-center">
                <div className="text-center" >
                            <img  className= "img-fluid" src={Image} alt="" />
                        </div>
                        
                    <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-3">
                    
                        <div className="mt-3 mt-md-5  bg-white rounded signUpbox" >
                            <h1 className="text-center" style={{ color: "#8B6CE3" }}>Sign Up</h1>
                            <form className="pt-4">
                                <div class="input-group flex-nowrap" >
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} size="xl" /></span>
                                    <input type="text" class="form-control" style={{fontSize:"24px"}} placeholder="First Name" aria-label="FirstName" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSignature} size="xl" /></span>
                                    <input type="text" class="form-control" style={{fontSize:"24px"}} placeholder="Last Name" aria-label="LastName" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                               
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faAt} size="xl"/></span>
                                    <input type="email" class="form-control" style={{fontSize:"24px"}} placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                               
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faCameraRetro} size="xl"/></span>
                                    <input type="email" class="form-control" style={{fontSize:"24px"}} placeholder="Content Category"  aria-label="Content" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                               
                                <div class="input-group flex-nowrap">

                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faLock} size="xl"/></span>
                                    <input type="password" class="form-control"  style={{fontSize:"24px"}} placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                        
                                <div className="d-flex align-items-center justify-content-center">

                                    <button type="submit" className="btn btn-lg" style={{ backgroundColor: "#8B6CE3", color: "#FFFFFF" }}>Create Account</button>
                                    <NavLink to="/login" className="btn btn-lg" style={{ backgroundColor: "#8B6CE3", color: "#FFFFFF", marginLeft:"5%" }}>LogIn</NavLink>

                                </div>
                                <br />
                               
                            </form>
                        </div>
                        
                    </div>
                   
                </div>
                
            </div>
        </>
    )
}
