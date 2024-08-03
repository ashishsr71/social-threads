import { useEffect, useState } from "react";
import io from "socket.io-client";




const useSocket=(url,userId)=>{
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
        if(!userId) return;
     const newSocket=io(url, {
        query: {
         userId}
        });
        // console.log(newSocket)
     setSocket(newSocket);

     return ()=>{newSocket.close()}
    },[url]);
    
    return socket;
};


export default useSocket;

