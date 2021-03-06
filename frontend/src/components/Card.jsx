import React from 'react'
import { NavLink } from "react-router-dom";
import "./styles/card.css"
export const Card = (props) => {
    
    return (
        <>
            
            <div className='col-md-6'>
            <br></br>
                <NavLink to={`/${props.title}`} style={{textDecoration: "none" ,color:"Black"}} >
                    <div className="card  justify-content-start align-items-center mx-auto" style={{ width: "20rem"}} id="main-card">
                        <img src={props.imgsrc} style={{width:"50%" ,height:"50%", paddingTop:"10%"}} className="card-img-top mx-auto d-block" alt={props.title} />
                        <div className="card-body">
                            <h2 className="text-center disabled" >{props.title}</h2>
                            <h4 className="text-center disabled" style={{color:"red"}}> {props.desc}</h4>
                        </div>
                        
                    </div>
                </NavLink>
            </div>

        </>
    )
}
