import React from 'react'
import { Flex, Box, Text,useBreakpointValue ,useColorModeValue,WrapItem,Avatar,Stack,} from '@chakra-ui/react';
// BsCheck2All
import { AddIcon, SearchIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { BsCheck2All } from 'react-icons/bs';



function Conversesation() {
    const sideBarWidth = useBreakpointValue({ base: "100%", md: "300px" }); 
    const user={userId:'asdfsaf',username:'ashish'}
    const currentUser={}
    const lastMessage={seen:true,sender:'sdfdfd'}
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
                userProfilePic: user.profilePic,
                username: user.username,
                mock: conversation.mock,
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
                src=''
                
            >
                {/* {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""} */}
            </Avatar>
        </WrapItem>

        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                {/* {user.username} <Image src='' w={4} h={4} ml={1} /> */}
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {currentUser._id === lastMessage.sender ? (
                    <Box color={lastMessage.seen ? "blue.400" : ""}>
                        <BsCheck2All size={16} />
                    </Box>
                ) : (
                    ""
                )}
                {/* {lastMessage.text.length > 18
                    ? lastMessage.text.substring(0, 18) + "..."
                    : lastMessage.text || <BsFillImageFill size={16} />} */}
            </Text>
        </Stack>
    </Flex>
)
}

export default Conversesation;