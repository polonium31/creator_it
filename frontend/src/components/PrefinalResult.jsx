import React, {useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FinalOutputOne } from './FinalOutputOne';
import { FinalOutputTwo } from './FinalOutputTwo';
import { useLocation } from 'react-router-dom';

export const PrefinalResult = (props) => {
    const {Id,SubId} = useParams(),
    location = useLocation();
    const [data, setData] = useState({});

    useEffect(()=>{
      setData(data);
    }, []);

  return (
    <>
    {(SubId==2 || (SubId==0 && (Id==0 || Id==1) ))?<FinalOutputTwo data={location.state}/>:<FinalOutputOne data={location.state}/>}
    </>
  )
}
