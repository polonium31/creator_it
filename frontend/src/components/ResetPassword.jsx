import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faArrowsRotate, faRepeat } from "@fortawesome/free-solid-svg-icons";
import './styles/reset.css'
import { NavLink } from "react-router-dom";

export const ResetPassword = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <h1><FontAwesomeIcon icon={faRepeat} style={{ paddingRight: "5px" }} />Reset Password</h1>
            <div className="p-3 mb-4 card" >
              <div className="container-fluid align-items-center justify-content-center" >
                <div style={{marginBottom:"-1.5%"}}>
                <NavLink to="/edit-profile" className="btn btn-lg col-lg-4 col-md-4 col-sm-6" id="main" ><FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "8px" }} />Edit Profile</NavLink>
                <NavLink to="/reset-password" className="btn btn-lg col-lg-4 col-md-4 col-sm-6" id="main" style={{color:"red"}}><FontAwesomeIcon icon={faArrowsRotate} style={{ paddingRight: "8px" }} />Reset Password</NavLink>
                </div>
                <hr/>
               <div className="col-md-6 offset-md-3 text-center">
               <form >
                    <div className="form-group">
                      <label>Old Password</label>
                      <input type="password" className="form-control" style={{fontSize:"24px"}} id="oldpassword" />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" className="form-control" style={{fontSize:"24px"}}  id="newpassword" />
                    </div>
                    <div className="form-group">
                      <label>Re-enter New Password</label>
                      <input type="password" className="form-control" style={{fontSize:"24px"}}  id="repassword" />
                    </div>
                  <br />
                 
                </form>
               </div>
               <div className="d-flex align-items-center justify-content-center ">
                  <button type="submit" className="btn-dark btn-lg" style={{paddingLeft:"5%", paddingRight:"5%",fontSize:"x-large"}}>Reset</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
