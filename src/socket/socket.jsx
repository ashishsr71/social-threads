
import { useSelector } from "react-redux";
import useSocket from "../hooks/socket";

import React, { useEffect,useState } from 'react'
import MesseageContainer from "../components/Conversesation";



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
    <div>
       <MesseageContainer/>
    </div>
  )
}

export default Socket;