import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Box,
    Image,
    Text,
    useDisclosure,
    Button,
    useColorModeValue,
    Flex,WrapItem,Avatar
  } from "@chakra-ui/react";
import { useSelector } from 'react-redux';




function SearchConver({searched,isOpen,onClose,setSelectedConversation,conversesations,setConverseations,current}) {
    const userId=useSelector(state=>state.auth.userId);
    const addConversesations=(newuser)=>{
        let conversationExists = false;

        for (let conv of conversesations) {
            if (conv?.participants?.includes(newuser.userId)) {
                conversationExists = true;
                break; // Stop the loop if the conversation exists
            }
        }
    
        // If conversation does not exist, push the new one
        if (!conversationExists) {
            setConverseations(prev => [...prev, newuser]);
        }
    
    };
    
  return (
    <>
   <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Responsive Cards</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

     
          {searched.length&& searched.map((user)=><Card user={user} setSelectedConversation={setSelectedConversation} onClose={onClose} addConversesations={addConversesations} userId={userId} />)}
          
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

export default SearchConver;

const Card = ({ user,setSelectedConversation,onClose,addConversesations,userId}) => (

    <Flex
        gap={4}
        alignItems={"center"}
        p={"1"}
        _hover={{
            cursor: "pointer",
            bg: useColorModeValue("gray.600", "gray.dark"),
            color: "white",
        }}
        onClick={() =>{
            onClose()
            addConversesations({
                _id: Math.random(),
                userId: user._id||user?.userId,
                userProfilePic: user.userImg||'',
                username: user.username,
                lastmessage:{},
                participants:[{_id:userId,username:''},{_id:user.userId,username:user.username}]
              
            });
            setSelectedConversation({
                _id: Math.random(),
                userId: user._id||user?.userId,
                userProfilePic: user.userImg||'',
                username: user.username,
              
            })}
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
                src=''
                
            >
                {/* {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""} */}
            </Avatar>
        </WrapItem>

        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight='700' display={"flex"} alignItems={"center"}>
               {user.username}
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {/* {userId === lastMessage.sende ? (
                    <Box color={lastMessage.seen ? "blue.400" : ""}>
                        <BsCheck2All size={16} />
                    </Box>
                ) : (
                    ""
                )} */}
                {/* {conversation.lastmessage.length > 18
                    ? conversation.lastmessage.text.substring(0, 18) + "..."
                    :conversation.lastmessage.text || <BsFillImageFill size={16} />} */}
            </Text>
        </Stack>
    </Flex>
  
  );