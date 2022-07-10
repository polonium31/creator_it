import React, { useState, useContext } from 'react'
import Image from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faLock, faSignature, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import "./styles/login.css"
import AuthContext from "../context/AuthContext";
export const SignUp = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [content_category, setCategory] = useState("");
	const [password, setPassword] = useState("");
	const [re_password, setPassword2] = useState("");
	const { registerUser } = useContext(AuthContext);

	const handleSubmit = async e => {
		e.preventDefault();
		registerUser(email, firstname, lastname, content_category, password, re_password);
	};

	return (
		<>

			<div className="container main ">
				<div className="row d-flex justify-content-start align-items-center">
					<div className="col-lg-8 offset-lg-2 col-md-8 offset-md-3 mainsignUpbox">
						<div className="loginbox" >
							<div className="text-center">
								<img className="img-fluid" src={Image} alt="Creator It" id="image" style={{ width: "35%", marginTop: "3%" }} />
							</div>
							<h1 className="text-center" style={{ color: "#000000" }}>Sign Up</h1>
							<form className="pt-2 col-md-7 mx-auto" onSubmit={handleSubmit} >

								<div className="inputContainer">
									<FontAwesomeIcon icon={faUser} id="icon" size="xl" />
									<input className="Field" required type="text" placeholder="First Name" onChange={e => setFirstname(e.target.value)} id="firstname" />
								</div>
								<div className="inputContainer">
									<FontAwesomeIcon icon={faSignature} id="icon" size="xl" />
									<input className="Field" required type="text" placeholder="Last Name" onChange={e => setLastname(e.target.value)} id="lastname" />
								</div>
								<div className="inputContainer">
									<FontAwesomeIcon icon={faAt} id="icon" size="xl" />
									<input className="Field" required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} id="email" />
								</div>
								<div className="inputContainer">
									<FontAwesomeIcon icon={faCameraRetro} id="icon" size="xl" />
									<select required className="Field" id="content_category" onChange={e => setCategory(e.target.value)}>
										<option hidden selected>Select Category</option>
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
								<div className="inputContainer">
									<FontAwesomeIcon icon={faLock} id="icon" size="xl" />
									<input className="Field" required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} id="password" />
								</div>
								<div className="inputContainer">
									<FontAwesomeIcon icon={faLock} id="icon" size="xl" />
									<input className="Field" required type="password" placeholder="Re-enter Password" onChange={e => setPassword2(e.target.value)} id="re_password" />
								</div>

								<div className="d-flex align-items-center justify-content-center" style={{ marginTop: "5%" }}>
									<button type="submit" className="btn-dark btn-lg loginBtn">Creat Account</button>
								</div>
							</form>
							<br />
						</div>
						<br />
					</div>

				</div>

			</div>
		</>
	)
}
