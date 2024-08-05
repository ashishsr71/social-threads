import React, { useRef, useState } from 'react'
import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import MessageEach from './MessageEach';
import MsgInput from './MsgInput';



function MessageContainer() {
    const messageEndRef=useRef()
    const currentUser={_id:12}
    const [messages,setMessages]=useState()
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
            <Image src='' w={4} h={4} ml={1} />
        </Text>
    </Flex>

    <Divider />

    <Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
        {false&&
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

        {true &&
            [1,2,3,4].map((message,i) => (
                <Flex
                    key={i}
                    direction={"column"}
                    ref={2- 1 === [1,2,3,4].indexOf(message) ? messageEndRef : null}
                >
                    <MessageEach message={message} ownMessage={currentUser._id === message.sender} />
                </Flex>
            ))}
    </Flex>

    <MsgInput  setMessages={setMessages} />
</Flex>
);
  
}

export default MessageContainer