import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import "./styles/footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear())


  useEffect(() => {
    getYear();
  }, [])
  return (
    <>
      <div className='w-100 text-center footer'>
        <h5 >Copyright &copy; {date} Reserved to the developers of the site. 
        <NavLink  className = "text-danger text-decoration-none" to="https://github.com/polonium31/creator_it">   <FontAwesomeIcon icon={faFileCode} style={{ paddingRight: "1vh" }} />Github</NavLink></h5>
      </div>
    </>
  )
}
