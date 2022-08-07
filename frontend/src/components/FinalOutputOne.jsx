import React from 'react'
import resultimg from "../images/ContentCreator.png"
import { useParams } from 'react-router-dom';
import SubItemData from "./SubItemData"
import Image from "../images/logo.png";
import './styles/result.css'
export const FinalOutputOne = (props) => {

  const { Item, Id, SubItem, SubId, Input } = useParams();
  return (
    <>
      <br />
      <div class="d-flex justify-content-center">
        <div className="col-lg-8 offset-lg-0 col-md-8 offset-md-2">
          <div className="verify-div" style={{ padding: "5% 5% 5% 5%" }}>
            <div className="row g-3">
              <div className="col-md-4">
                <img className="img-fluid" src={SubItemData[Id][SubId].imgsrc} alt={Item} style={{ width: "200px", height: "200px", border: "1px solid black", borderRadius: "50%" }} />
              </div>
              <div className="col-md-6">
                <h1 style={{ color: "#000000", padding: "10% 5% 5% 5%" }} >{Input}</h1>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <h2 style={{ color: "#000000", padding: "5% 5% 1% 5%" }} >Total Subscribers:</h2>
                <h3 style={{ color: "#A0A0A0", padding: "0% 5% 0% 5%" }} >1234441</h3>
              </div>
              <div className="col-md-6">
                <h2 style={{ color: "#000000", padding: "5% 5% 1% 5%" }} >Total Channel Views:</h2>
                <h3 style={{ color: "#A0A0A0", padding: "0% 5% 0% 5%" }} >1234441</h3>
              </div>
            </div>
            <div className="row g-3">
              <div className='text-center'>
                <h1 style={{ color: "#000000", padding: "5% 5% 1% 5%" }} >Engagement Rate:</h1>
                <h2 style={{ color: "#FF0000", padding: "0% 5% 0% 5%", fontWeight: "700" }} >56%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
