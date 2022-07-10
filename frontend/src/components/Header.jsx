import React, { useContext,useEffect,useState } from 'react'
import Image from "../images/logo.png";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import "./styles/header.css"
import { faUserGear, faMoon, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
    const mystyle =
    {
        paddingRight: "5px",
    }
    const mylink =
    {
        backgroundColor: "white",
        color: "black",
    }
    const { fetchData } = useContext(AuthContext);
    const [data,setData] = useState({});
    const call = async () =>
    {
      setData(await fetchData()) 
    }
    useEffect(
    () => call(),[])
  
      
    const { logoutUser } = useContext(AuthContext);
    return (
        <>
                    <div className='container-fluid nav_bg' style={{marginTop:"1%"}}>
                        <div className='row'>
                            <div className='mx-auto'>
                                <nav className="navbar navbar-expand-lg bg">
                                    <div className="container-fluid">
                                        <NavLink className="navbar-brand" to="/"> <img className="img-responsive" src={Image} style={{ width: "35%"}} /></NavLink>
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <ul className="navbar-nav ms-auto  mb-2 mb-lg-10">
                                            <li className="nav-item dropdown">

                                                <h3 className=" dropdown-toggle " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FontAwesomeIcon icon={faUserGear} style={{ paddingRight: "1vh" }} />
                                                    {data.firstname} 
                                                </h3>
                                                <ul className="dropdown-menu dropmenu" ariaLabelledby="navbarDropdown" style={{ fontSize: "2.5vh" }}>
                                                    <li className='option' style={{ borderBottom: "1px solid black"}}><NavLink className="dropdown-item " to="/profile" style={mylink}><FontAwesomeIcon icon={faUser} style={mystyle} />Profile Settings</NavLink></li>
                                                    <li className='option' style={{ borderBottom: "1px solid black"}}><NavLink className="dropdown-item " to="/" style={mylink}><FontAwesomeIcon icon={faMoon} style={mystyle} />Dark Mode</NavLink></li>
                                                    <li className='option'><button className="dropdown-item " onClick={logoutUser} style={mylink}><FontAwesomeIcon icon={faArrowRightFromBracket} style={mystyle} />Log Out</button></li>
                                                </ul>
                                            </li>
                                        </ul>


                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
        </>
    )
}
