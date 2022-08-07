import React, { useContext, useState, useEffect } from 'react';
import resultimg from "../images/ContentCreator.png"
import SubItemData from "./SubItemData"
import './styles/result.css'
import { useHistory,useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export const Result = (props) => {
    const { Item, Id, SubItem, SubId } = useParams();
    const { fetchResult } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [link, setLink] = useState('');
    const [input, setInput] = useState('');
    const [data, setData] = useState({});

    const history = useHistory();
    const handleSubmit = e => {
        e.preventDefault();
        const input = e.target.keyword.value;
        var s = `http://127.0.0.1:8000/${Item}/${Id}/${SubItem}/${SubId}`;
        var x = `/${Item}/${Id}/${SubItem}/${SubId}/${input}`;
        history.push(x);
        setLink(s);
        setInput(input);
    };
   
    const call = async () => {
        const x = await fetchResult(link,input);
        setData(x);
        console.log(data);
    }
    useEffect(
        () => {
            setLoader(true);
            call();
            setLoader(false);
        }, [])
    return (
        <>
            <div className='container-fluid' style={{ marginbottom: "-5%" }}>
                <div className='row'>
                    <div className='col-8 mx-auto'><br />
                        <h1 > <img src={SubItemData[Id][SubId].imgsrc} alt={Item} style={{ width: "10%", height: "10%" }} /> {Item} {SubItemData[Id][SubId].title}</h1>
                        <form onSubmit={handleSubmit}>

                            {/* <div className="from-group">
                                <label>Enter the Category you want to search for :</label>
                                <select className="form-select" id="content_category" style={{ fontSize: "24px", border: "3px solid black" }}>
                                    <option selected>Select Category</option>
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
                            </div> */}
                            <br /> <br />
                            <div className="form-group" >
                                <label>Enter any Keyword of your choice :</label>
                                <input type="text" required className="form-control" style={{ fontSize: "24px", border: "3px solid black" }} name="keyword" />
                            </div>
                            <br />
                            <div className="d-flex align-items-center justify-content-center">

                                <button type='submit' className="btn btn-lg" style={{ backgroundColor: "#000", color: "#FFFFFF" }}>Get Prediction</button>

                            </div>

                        </form>
                        <img src={resultimg} className="rounded mx-auto d-block img-fluid mainimg" alt="Image" style={{ marginTop: "0%", marginBottom: "-5%", width: "30%" }} />

                    </div>
                </div>
            </div><br /> <br />
        </>
    )
}
