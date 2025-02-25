import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Box, HStack, Avatar, Text, Flex } from "@chakra-ui/react";
// import { ChevronRightIcon } from "@chakra-ui/icons";
import ConferenceTile from "../components/ConferenceTile";
import axios from "axios"
import { useSelector } from "react-redux";
import { EventSourcePolyfill } from 'event-source-polyfill';

const MotionFlex = motion(Flex);
const data = [
    {
      id: 1,
      users: [
        { id: "u1", src: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: "u2", src: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: "u3", src: "https://randomuser.me/api/portraits/women/3.jpg" },
      ],
      text: "+150 - season finale watch...",
    },
    {
      id: 2,
      users: [
        { id: "u4", src: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: "u5", src: "https://randomuser.me/api/portraits/women/5.jpg" },
      ],
      text: "+200 - gaming night!",
    },
    {
      id: 3,
      users: [
        { id: "u6", src: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: "u7", src: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: "u8", src: "https://randomuser.me/api/portraits/men/8.jpg" },
      ],
      text: "+300 - tech meetup!",
    },
  ];




 
function ConferencePage() {
    const scrollRef = useRef(null);
    const [conferences,setConferences]=useState([]);
    const token=useSelector(state=>state.auth.token);
    console.log(conferences)
    // console.log(token)
    useEffect(()=>{

      // initally fetch the conferences for a user
      const fetchConferences=async()=>{
     const {data}=await axios.get(`${import.meta.env.VITE_API}/conferences`,{withCredentials:true,headers:{
      token,
     }});
     setConferences([...data]);
      };
      fetchConferences();
      const eventSource =  new EventSourcePolyfill(`${import.meta.env.VITE_API}/events`, {withCredentials:true,
        headers: {
            token
        },
        heartbeatTimeout: 60000
    });
   
  eventSource.onmessage=(event)=>{
    const data=JSON.parse(event.data);
    
    if(data.type!="heartbeat"){
      console.log(data)
      setConferences(prev=>prev.push(data));
    }
    
  }
  eventSource.onerror=(event)=>{

    console.log("sse error",event);
    eventSource.close();
  };

  return ()=>{
    eventSource.close();
  }
    },[]);


  return (
    <Box overflow="hidden" py={2} px={4}>
      <MotionFlex
        ref={scrollRef}
        drag="x"
        dragConstraints={{ left: -500, right: 0 }}
        cursor="grab"
      >
        <HStack spacing={3}>
          {conferences.length&&conferences.length>0&&conferences.map((item) => (<ConferenceTile item={item} key={item.id}/>
          ))}
        </HStack>
      </MotionFlex>
    </Box>
  );
};
export default ConferencePage;