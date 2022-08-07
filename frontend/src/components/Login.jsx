import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import Image from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./styles/login.css"
import AuthContext from "../context/AuthContext";
import Google from "../images/Google.png"
export const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password);
  };

  return (
    <>
      <div className="container main" style={{margin:"5% 5% 5% 5%"}}>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-3 align-items-center">
 
            <div className="loginbox">
              <div className="text-center">
                <img className="img-fluid" src={Image} alt="Creator It" id="image" style={{ width: "50%", marginTop: "3%" }} />
              </div>
              
              <h1 className="text-center" style={{ color: "#000000" }}>LogIn</h1>
              <form className="pt-4 col-md-7 col-sm-10 mx-auto" onSubmit={handleSubmit} >

                <div className="inputContainer">
                <FontAwesomeIcon icon={faUser} id="icon" size="xl" />
                  <input className="Field" required type="email" placeholder="Email" name="email" />
                </div>
                <div className="inputContainer">
                <FontAwesomeIcon icon={faLock} id="icon" size="xl" />
                  <input className="Field" required type="password" placeholder="Password"  name="password"/>
                </div>
                <div className="d-flex jusity-content-end pb-4">
                  <div className="ms-auto">
                    <NavLink to="/forgot-password" className="text-danger text-decoration-none">
                      Forgot Password ?</NavLink>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-block btn-lg googlebtn"> <img src={Google} alt="" /> Sign In with Google  </button>
                </div>
                <br />
                <div className="d-flex align-items-center justify-content-center ">
                  <button type="submit" className="btn-dark btn-lg loginBtn">LogIn</button>
                </div>
              </form>
              <div className="register mt-2 text-center">
                  <p>Don't have an account? <NavLink to="/signup"  className="text-danger text-decoration-none">Create an account</NavLink></p>
                </div>
      <br />
            </div> <br />

          </div>
          <br />
        </div>

      </div>
    </>
  );
};
