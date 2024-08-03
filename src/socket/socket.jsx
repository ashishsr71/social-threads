
import { useSelector } from "react-redux";
import useSocket from "../hooks/socket";

import React, { useEffect,useState } from 'react'




function Socket() {
    const {userId}=useSelector(state=>state.auth);
    const socket=useSocket("http://localhost:4000",userId)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
//   console.log(message)
    useEffect(() => {
       if(!socket)return;
        socket.on('message', (message) => {
            console.log(message)
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };
  return (
    <div>socket
        <input type="text" value={message} onChange={(e)=>{
          setMessage(e.target.value)}} />
        <button onClick={sendMessage}>send</button>
    </div>
  )
}

export default Socket;