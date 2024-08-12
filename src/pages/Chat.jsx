import React, { useEffect, useState } from 'react'
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi";
import Conversesation from '../components/Conversesation';
import MessageContainer from '../components/MessageContainer';
import MessageEach from '../components/MessageEach';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useSocket from '../hooks/socket';
// component starts here
function Chat() {
    const {token,userId}=useSelector(state=>state.auth);
const socket=useSocket(import.meta.env.VITE_API,userId)
    const [loadingConversations,setloadingConversesations]=useState(false);
    const[conversesations,setConversesations]=useState([]);
    const[messages,setMessages]=useState([]);
    const [current,setCurrent]=useState({});

// this will get all conversesations
useEffect(()=>{
    
    axios.get(`${import.meta.env.VITE_API}/user/getconver`,{headers:{token}}).then(res=>{
        // console.log(res.data)
        setConversesations(res.data)});
    
       },[]);


    //will connect to sockets    
useEffect(()=>{
if(!socket)return;
socket.on('message',(message)=>{
    console.log(message)
    setMessages(prev=>[...prev,message])
})


return ()=>{socket.off('message')}

},[socket,current]);


// this effect will let you get messages of particular conversesattion

useEffect(()=>{
 if(!current._id)return;
 axios.get(`${import.meta.env.VITE_API}/user/getcurrent/${current._id}`,{headers:{token}}).then(res=>{
    console.log(res.data);
    setMessages(res.data);
 });

},[current])





       const handleConversationSearch=()=>{};
const searchingUser=false


  return (<Box
  position={"absolute"}
  left={"50%"}
  w={{ base: "100%", md: "80%", lg: "750px" }}
  p={4}
  transform={"translateX(-50%)"}
>
  <Flex
      gap={4}
      flexDirection={{ base: "column", md: "row" }}
      maxW={{
          sm: "400px",
          md: "full",
      }}
      mx={"auto"}
  >
      <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
          <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
              Your Conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
              <Flex alignItems={"center"} gap={2}>
                  <Input placeholder='Search for a user' onChange={(e) => setSearchText(e.target.value)} />
                  <Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
                      <SearchIcon />
                  </Button>
              </Flex>
          </form>

          {!loadingConversations &&
              [0, 1, 2, 3].map((_, i) => (
                  <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                      <Box>
                          <SkeletonCircle size={"10"} />
                      </Box>
                      <Flex w={"full"} flexDirection={"column"} gap={3}>
                          <Skeleton h={"10px"} w={"80px"} />z
                          <Skeleton h={"8px"} w={"90%"} />
                      </Flex>
                  </Flex>
              ))}

          {conversesations.length &&
              conversesations.map((conversation,i) => (
                 < Conversesation conversation={conversation} setSelectedConversation={setCurrent} />
          ))}
      </Flex>
      {!current._id && (
          <Flex
              flex={70}
              borderRadius={"md"}
              p={2}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"400px"}
          >
              <GiConversation size={100} />
              <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
      )}

      {current._id && <MessageContainer messages={messages} socket={socket} current={current} setMessages={setMessages}/>}
  </Flex>
</Box>
);
}

export default Chat