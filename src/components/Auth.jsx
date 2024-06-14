import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';



function Auth({children}) {
    const user= useSelector(state=>state.auth);
    const navigate= useNavigate();
   useEffect(()=>{
    if(!user.userId&&!user.token){
        navigate('/login')
    }


   },[user])



  return <>
  
  {children}
  
  </>
}

export default Auth;