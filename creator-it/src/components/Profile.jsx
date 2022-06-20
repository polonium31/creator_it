import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPenToSquare, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import './styles/profile.css'
import {NavLink} from "react-router-dom";
export const Profile = () => {

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <h1><FontAwesomeIcon icon={faUser} style={{ paddingRight: "5px" }} />My Profile</h1>
            <div className="p-3 mb-4 card" >
              <div className="container-fluid align-items-center justify-content-center" >
                <div>
                <NavLink to="/edit-profile" className="btn btn-lg " id="main" style={{fontSize:"3.5vh"}}><FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "8px" }} />Edit Profile</NavLink>
                <NavLink to="/reset-password" className="btn btn-lg " id="main" style={{fontSize:"3.5vh"}}><FontAwesomeIcon icon={faArrowsRotate} style={{ paddingRight: "8px" }} />Reset Password</NavLink>
                </div>
                <hr/>
                <form>
                  <div class="row mt-2" >
                    <div className="form-group col-md-6">
                      <label>First Name</label>
                      <input type="text" className="form-control" disabled placeholder="First Name" style={{fontSize:"24px"}} id="firstName" />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label>Last Name</label>
                      <input type="text" className="form-control"  disabled placeholder="Last Name" style={{fontSize:"24px"}}  id="lastName" />
                    </div>
                  </div>

                  <div class="row mt-2">
                    <div className="form-group col-md-6">
                      <label>Email</label>
                      <input type="email" className="form-control" disabled placeholder="Email" style={{fontSize:"24px"}}  id="email" />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Phone No.</label>
                      <input type="phone" className="form-control" disabled placeholder="Phone No." style={{fontSize:"24px"}}  id="phoneNumber" />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div className="form-group col-md-6">
                      <label>Content Category</label>
                      <input type="text" className="form-control" disabled placeholder="Content Category" style={{fontSize:"24px"}}  id="content" />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Password</label>
                      <input type="password" className="form-control" disabled placeholder="***********" style={{fontSize:"24px"}}  id="password" />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex align-items-center justify-content-center">
                    
                  <button type="submit" className="btn btn-lg save">Save</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
