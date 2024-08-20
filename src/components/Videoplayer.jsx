import React, { useEffect, useRef } from 'react'

function Videoplayer({stream,callAccepted,callEnded,userVideo,myVideo}) {
 
   
  return (
    <div>
       {stream&&  <video ref={myVideo} autoPlay muted style={{  width: "250px"}} />}
       {callAccepted&&!callEnded&&<video ref={userVideo} autoPlay style={{ width: "250px" }} />}  </div>
  )
}

export default Videoplayer