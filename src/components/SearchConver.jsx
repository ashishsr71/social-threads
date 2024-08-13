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



function SearchConver({searched,isOpen,onClose,setSelectedConversation}) {
  return (
    <>
   <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Responsive Cards</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

     
          {searched.length&& searched.map((user)=><Card user={user} setSelectedConversation={setSelectedConversation} onClose={onClose} />)}
          
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

export default SearchConver;

const Card = ({ user,setSelectedConversation,onClose}) => (

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