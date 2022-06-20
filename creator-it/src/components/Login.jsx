import React from 'react';
import { NavLink } from "react-router-dom";
import loginimg from "../images/LoginImg.png"
import Image from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faG } from "@fortawesome/free-solid-svg-icons";
import "./styles/login.css"
export const Login = () => {
    return (
        <>
        
            <div className="container main">
                <div className="row d-flex justify-content-start align-items-center mt-sm-5">
                    <div className="col-lg-5 col-10 " >
                        <div className="pb-8 " > <img  src={loginimg} className="img-fluid mainimg" alt="" /> </div>
                    </div>
                    <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
                        <div className="pt-4 text-center" style={{marginBottom:"-10%"}} >
                            <img  className= "img-fluid" src={Image} alt="" />
                        </div>
                        <div className="mt-3 mt-md-5  bg-white rounded loginbox"  >
                            <h2 className="text-center" style={{ color: "#8B6CE3" }}>LogIn</h2>
                            <form className="pt-4">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} /></span>
                                    <input type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                                <div class="input-group flex-nowrap">

                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faLock} /></span>
                                    <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
                                </div>
                                <br />
                                <div className="d-flex jusity-content-end pb-4">
                                    <div className="ms-auto">
                                        <NavLink to="#" className="text-danger text-decoration-none">
                                            Forgot password?</NavLink>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">

                                    <button type="submit" className="btn btn-lg" style={{ backgroundColor: "#8B6CE3", color: "#FFFFFF" }}>LogIn</button>
                                </div>
                                <br />
                                <div className="d-flex align-items-center justify-content-center">

                                    <button className="btn btn-block bg-white border border-primary rounded btn-lg"> Log In with <FontAwesomeIcon icon={faG}/> </button>
                                </div>

                                <div className="register mt-5 text-center">
                                    <p>Don't have an account? <NavLink to="/signup">Create an account</NavLink></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
