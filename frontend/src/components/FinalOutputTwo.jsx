import React, { useState, useEffect } from 'react'
import resultimg from "../images/ContentCreator.png"
import { useParams } from 'react-router-dom';
import SubItemData from "./SubItemData"
import './styles/finaloutputtwo.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FinalOutputTwo = ({data}) => {
    const { Item, Id, SubItem, SubId, Input } = useParams();
    const notify = () => {
        toast.info("Copied!!", {
            icon: "☑️"
        });
    };

    return (
        <>
            <br />
            <div class="d-flex justify-content-center">
                <div className="col-lg-8 offset-lg-0 col-md-8 offset-md-2">
                    <div className="final-div" style={{ padding: "5% 5% 5% 5%" }}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <img className="img-fluid" src={SubItemData[Id][SubId].imgsrc} alt={Item} style={{ width: "120px", height: "120px", border: "1px solid black", borderRadius: "50%" }} />
                            </div>
                            <div className="col-md-6">
                                <h1 style={{ color: "#000000", padding: "10% 5% 5% 5%" }} >#{Input}</h1>
                            </div>
                        </div>
                        <br />
                        <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} bodyClassName="toastBody" progressClassName="toastProgress" />
                        <div className='text-center'>
                            {Object.keys(data).map(item => (
                                        
                                <CopyToClipboard text={data[item]}>
                                        <button type="button" onClick={notify} className="btn btn-outline-dark btn-lg hashtag d-inline" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy the Tag">{data[item]}</button>
                                </CopyToClipboard>
                            
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
