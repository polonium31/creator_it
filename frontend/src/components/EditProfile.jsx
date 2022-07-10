import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import './styles/profile.css'
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const EditProfile = () => {
  const { fetchData } = useContext(AuthContext);
  const [data, setData] = useState({});
  const call = async () => {
    setData(await fetchData())
  }
  useEffect(
    () => call(), [])

  const { editUser } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    const fname = e.target.firstname.value;
    const lname = e.target.lastname.value;
    const cc = e.target.content_category.value;
    const firstname = fname === "" ? data.firstname : fname;
    const lastname = lname === "" ? data.lastname : lname;
    const content_category = cc === "" ? data.content_category : cc;

    editUser(firstname, lastname, content_category);
  };
  return (
    <>
      <br />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <h1><FontAwesomeIcon icon={faUser} style={{ paddingRight: "5px" }} />Edit Profile</h1>
            <div className="p-3 mb-4 card" >
              <div className="container-fluid align-items-center justify-content-center" >
                <div style={{ marginBottom: "-1.5%" }}>
                  <NavLink to="/edit-profile" className="btn btn-lg " id="main" style={{ fontSize: "3.5vh", color: "red" }}><FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "8px" }} />Edit Profile</NavLink>
                  <NavLink to="/reset-password" className="btn btn-lg " id="main" style={{ fontSize: "3.5vh" }}><FontAwesomeIcon icon={faArrowsRotate} style={{ paddingRight: "8px" }} />Reset Password</NavLink>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="row mt-2" >
                    <div className="form-group col-md-6">
                      <label>First Name</label>
                      <input type="text" className="form-control" placeholder={data.firstname} name="firstname" style={{ fontSize: "24px" }} id="firstName" />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label>Last Name</label>
                      <input type="text" className="form-control" placeholder={data.lastname} style={{ fontSize: "24px" }} id="lastName" name="lastname" />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group col-md-6">
                      <label>Content Category</label>
                      <select className="form-select" id="content_category" style={{ fontSize: "24px" }} placeholder={data.content_category} name="content_category">
                        <option selected>{data.content_category}</option>
                        <option>Vlogs and Blogs</option>
                        <option >Video Game and Esports</option>
                        <option >Film and Animation</option>
                        <option >News and Politics</option>
                        <option >Kids</option>
                        <option >Comedy / Sketch Videos</option>
                        <option >Education</option>
                        <option >How To and Style</option>
                        <option >How To Guides and Tutorials</option>
                        <option >Product Reviews</option>
                        <option >Celebrity Gossip Videos</option>

                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Email</label>
                      <input type="text" className="form-control" value={data.email} disabled style={{ fontSize: "24px" }} id="content" />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex align-items-center justify-content-center ">
                    <button type="submit" className="btn-dark btn-lg" style={{ paddingLeft: "5%", paddingRight: "5%" }}>Save</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}
