import React from 'react'
import resultimg from "../images/ContentCreator.png"
import { useParams } from 'react-router-dom';
export const Result = () => {
    const { Item, Id, SubItem, SubId } = useParams();
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8 mx-auto'>
                        <h1 className='text-center'>{SubItem}</h1>
                        <div class="input-group">
                            <select class="form-select" id="inputGroupSelect01" style={{fontSize:"2.5vh"}}>
                                <option selected>Select Category</option>
                                <option value="1">Vlogs and Blogs</option>
                                <option value="2">Video Game and Esports</option>
                                <option value="3">Film and Animation</option>
                                <option value="4">News and Politics</option>
                                <option value="5">Kids</option>
                                <option value="6">Comedy / Sketch Videos</option>
                                <option value="7">Education</option>
                                <option value="8">HowTo and Style</option>
                                <option value="9">How To Guides and Tutorials</option>
                                <option value="10">Product Reviews</option>
                                <option value="11">Celebrity Gossip Videos</option>

                            </select>
                        </div>
                                <img src={resultimg} className="rounded mx-auto d-block img-fluid mainimg" alt="Image" style={{ marginTop: "0%", marginBottom: "-5%"  }} />
                       

                    </div>
                </div>
            </div>
        </>
    )
}
