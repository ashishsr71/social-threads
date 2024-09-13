import React, { useEffect, useState } from 'react'
import { Flex, Box, Text,useBreakpointValue ,useColorModeValue,WrapItem,Avatar,Stack,} from '@chakra-ui/react';
// BsCheck2All
import { AddIcon, SearchIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { BsCheck2All } from 'react-icons/bs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsFillImageFill } from 'react-icons/bs';


function Conversesation({conversation,setSelectedConversation}) {
    const sideBarWidth = useBreakpointValue({ base: "100%", md: "300px" }); 
    const {token,userId}=useSelector(state=>state.auth);
    // const user={userId:'asdfsaf',username:'ashish'}
   
    const lastMessage=conversation.lastmessage;
    
    const user=conversation.participants.find((r)=>r._id !=userId)
//    to fetch conversesations
 


  return (
    <Flex
        gap={4}
        alignItems={"center"}
        p={"1"}
        _hover={{
            cursor: "pointer",
            bg: useColorModeValue("gray.600", "gray.dark"),
            color: "white",
        }}
        onClick={() =>
            setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                userProfilePic: user.userImg,
                username: user.username,
              
            })
        }
       
        borderRadius={"md"}
    >
        <WrapItem>
            <Avatar
                size={{
                    base: "xs",
                    sm: "sm",
                    md: "md",
                }}
                src={user.userImg}
                
            >
                {/* {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""} */}
            </Avatar>
        </WrapItem>

        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight='700' display={"flex"} alignItems={"center"}>
               {user.username}
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {userId === lastMessage.sender ? (
                    <Box color={lastMessage.seen ? "blue.400" : ""}>
                        <BsCheck2All size={16} />
                    </Box>
                ) : (
                    ""
                )}
                {conversation.lastmessage.length > 18
                    ? conversation.lastmessage.text.substring(0, 18) + "..."
                    :conversation.lastmessage.text || <BsFillImageFill size={16} />}
            </Text>
        </Stack>
    </Flex>
)
}

export default Conversesation;