import React from 'react'
import Image from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import "./styles/header.css"
import { faScrewdriverWrench, faMoon, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
    return (
        <>
            <div className='container-fluid nav_bg'>
                <div className='row'>
                    <div className='mx-auto'>
                        <nav className="navbar navbar-expand-lg bg">
                            <div className="container-fluid">
                                <NavLink class="navbar-brand" to="/"> <img class="img-responsive" src={Image} /></NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <ul className="navbar-nav ms-auto  mb-2 mb-lg-10">
                                    <li className="nav-item dropdown">

                                        <h3 className=" dropdown-toggle " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faScrewdriverWrench} style={{ paddingRight: "1vh" }} />
                                            Settings
                                        </h3>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ fontSize: "2.5vh" }}>
                                            <li className='option'><NavLink className="dropdown-item " to="/profile" style={mylink}><FontAwesomeIcon icon={faUser} style={mystyle} />Profile</NavLink></li>
                                            <li className='option'><NavLink className="dropdown-item " to="/profile" style={mylink}><FontAwesomeIcon icon={faMoon} style={mystyle} />Dark Mode</NavLink></li>
                                            <li className='option'><NavLink className="dropdown-item " to="/profile" style={mylink}><FontAwesomeIcon icon={faArrowRightFromBracket} style={mystyle} />Log Out</NavLink></li>
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
