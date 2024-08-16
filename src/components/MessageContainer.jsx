import React, { useRef, useState,useEffect} from 'react'
import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import MessageEach from './MessageEach';
import MsgInput from './MsgInput';
import { useSelector } from 'react-redux';
import VideoCall from './VideoCall';



function MessageContainer({socket,messages,current,setMessages}) {
    const messageEndRef=useRef(null)
    const [vcall,setVcall]=useState(false);
    const userId=useSelector(state=>state.auth.userId);
   useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

//   console.log(current);
  return (
    <Flex
    flex='70'
    bg={useColorModeValue("gray.200", "gray.dark")}
    borderRadius={"md"}
    p={2}
    flexDirection={"column"}
>
    {/* Message header */}
    <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src='' size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
            {/* <Image src='' w={4} h={4} ml={1} /> */}
            {current.username}
        </Text>
    
    </Flex>
   {vcall&&<VideoCall/>}
    <Divider />

    <Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
        {messages.length==0&&
            [...Array(5)].map((_, i) => (
                <Flex
                    key={i}
                    gap={2}
                    alignItems={"center"}
                    p={1}
                    borderRadius={"md"}
                    alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                >
                    {i % 2 === 0 && <SkeletonCircle size={7} />}
                    <Flex flexDir={"column"} gap={2}>
                        <Skeleton h='8px' w='250px' />
                        <Skeleton h='8px' w='250px' />
                        <Skeleton h='8px' w='250px' />
                    </Flex>
                    {i % 2 !== 0 && <SkeletonCircle size={7} />}
                </Flex>
            ))}

        {messages.length &&
            messages.map((message,i) => (
                <Flex
                    key={i}
                    direction={"column"}
                    ref={messages?.length- 1 === messages.indexOf(message) ? messageEndRef : null}
                >
                    <MessageEach message={message} ownMessage={userId === message.senderId} />
                </Flex>
            ))}
    </Flex>

    <MsgInput  setMessages={setMessages} socket={socket}  reciepentId={current.userId}/>
</Flex>
);
  
}

export default MessageContainer;



const VideoSvg=({setVcall})=>{
    return(
        <div style={{cursor:"pointer" }}>
        <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor"
    onClick={e=>setVcall(prev=>!prev)}
    >

  <path 
    d="M17 10.5V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
</svg></div>
    )
}