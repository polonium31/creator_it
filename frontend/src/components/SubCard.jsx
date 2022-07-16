import React from 'react'
import { NavLink } from "react-router-dom";
import "./styles/scard.css"
export const SubCard = (props) => {
   var s =  `/${props.maintitle}/${props.mainindex}/${props.title}/${props.idx}`;
var c = `${props.title}`==="Comming Soon"?s=`/${props.maintitle}`:s;
    return (
        <>

            <div className='col-md-6 col-10 mx-auto'>
                <br></br>
                <NavLink to={c} style={{ textDecoration: "none", color: "Black" }}>
                    <div className="card  justify-content-start align-items-center mx-auto" style={{ width: "18rem", height: "16rem" }}>
                        <div className="card-body ">
                            <div class="container d-flex h-100 maincard">
                                <div class="row justify-content-center align-self-center">
                                    <h2 className="text-center disabled" >{props.title}</h2>
                                </div>
                            </div>

                        </div>

                    </div>
                </NavLink>
            </div>

        </>
    )
}
