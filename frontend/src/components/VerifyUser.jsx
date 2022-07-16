import React, { useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';
export const VerifyUser = () => {
  useEffect(()=>console.log("verifyUser"),[])
  const { verifyUserEmail } = useContext(AuthContext);

  const { Uid, Token} = useParams();
  verifyUserEmail(Uid, Token);
  return (
     <>
      <p>{Uid}</p>
      <p>{Token}</p>
      </>
  )
}
