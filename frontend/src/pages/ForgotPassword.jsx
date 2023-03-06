import React, { useContext } from 'react';
import Image from "../images/logo.png";
import ForgotIMG from "../images/ForgotPassword.gif";
import "./styles/emailverify.css"
import AuthContext from "../context/AuthContext";
export const ForgotPassword = () => {
    const { ForgotUserPassword } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        ForgotUserPassword(email);
    };
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-lg-8 offset-lg-0 col-md-8 offset-md-2">
                    <br />
                    <div className="text-center">
                        <img className="img-fluid" src={Image} alt="Creator It" id="image" style={{ width: "45%" }} />
                    </div>
                    <br />
                    <div className="verify-div" >
                        <br />
                        <h1 className="text-center " style={{ color: "#000000" }}>Forgot Password</h1>
                        <br />
                        <div className="text-center">
                            <img className="img-fluid" src={ForgotIMG} alt="Creator It" id="image" style={{ width: "20%" }} />
                        </div>
                        <br />
                        <div className="container">
                            <div className="row d-flex justify-content-start align-items-center auto-ms">

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group col-8" >
                                        <label>Enter Email:</label>
                                        <input type="email" required className="form-control" style={{ fontSize: "24px", border: "3px solid black" }} placeholder="Enter Email" name="email" />
                                    </div>
                                    <br />
                                    <div className="d-flex align-items-center justify-content-center ">
                                        <button type="submit" className="btn-dark btn-lg">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </>

    )
}
