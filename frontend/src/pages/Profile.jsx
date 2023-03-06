import React,{useContext,useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPenToSquare, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import './styles/profile.css'
import {NavLink} from "react-router-dom";
import AuthContext from "../context/AuthContext";
export const Profile = () => {
  const { fetchData } = useContext(AuthContext);
  const [loader,setLoader] = useState(false);
  const [data,setData] = useState({});
  const call = async () => {
    const x = await fetchData()
    setData(x);
  }
  useEffect(
    () => {
        setLoader(true);
        call();
        setLoader(false);
    },[])
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <h1><FontAwesomeIcon icon={faUser} style={{ paddingRight: "5px" }} />My Profile</h1>
            <div className="p-3 mb-4 card" >
              <div className="container-fluid align-items-center justify-content-center" >
                <div style={{marginBottom:"-1.5%"}}>
                <NavLink to="/edit-profile" className="btn btn-lg col-lg-4 col-md-4 col-sm-6" id="main"><FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "8px" }} />Edit Profile</NavLink>
                <NavLink to="/reset-password" className="btn btn-lg  col-lg-4 col-md-4 col-sm-6" id="main"><FontAwesomeIcon icon={faArrowsRotate} style={{ paddingRight: "8px" }} />Reset Password</NavLink>
                </div>
                <hr/>
                <form>
                  <div className="row mt-2" >
                    <div className="form-group col-md-6">
                      <label>First Name</label>
                      <input type="text" className="form-control" value = {data.firstname} disabled placeholder="First Name" style={{fontSize:"24px"}} id="firstName" />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label>Last Name</label>
                      <input type="text" className="form-control"  value = {data.lastname}  disabled placeholder="Last Name" style={{fontSize:"24px"}}  id="lastName" />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group col-md-6">
                      <label>Email</label>
                      <input type="email" className="form-control" value = {data.email} disabled placeholder="Email" style={{fontSize:"24px"}}  id="email" />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Content Category</label>
                      <input type="text" className="form-control"  value = {data.content_category}  disabled placeholder="Content Category" style={{fontSize:"24px"}}  id="content" />
                    </div>
                   
                  </div>
                  <div className="row mt-2">
                     <div className="form-group col-md-6">
                      <label>Password</label>
                      <input type="password" className="form-control" disabled placeholder="***********" style={{fontSize:"24px"}}  id="password" />
                    </div>
                  </div>
                  <br />
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
