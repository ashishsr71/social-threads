import React, { useEffect, useRef } from 'react'

function Videoplayer() {
    const videoRef=useRef()
    useEffect(()=>{
        async function init(){
const stream=await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
videoRef.current.srcObject=stream;
        };
        init()
    },[])
  return (
    <div> <video ref={videoRef} autoPlay muted style={{  width: "250px"}} /></div>
  )
}

export default Videoplayer