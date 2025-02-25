import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

// useLocation


function Auth({children}) {
    const user= useSelector(state=>state.auth);
    const navigate= useNavigate();
    const location=useLocation();
    // const url=new URL(location);
    // console.log(url);
    // console.log(location)
   useEffect(()=>{
    
    if(!user.userId&&!user.token){
    
        navigate('/login')
    };


   },[user])



  return <>
  
  {children}
  
  </>
}

export default Auth;