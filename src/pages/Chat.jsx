import React from 'react'
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi";
import Conversesation from '../components/Conversesation';
import MessageContainer from '../components/MessageContainer';
import MessageEach from '../components/MessageEach';


// component starts here
function Chat() {



const handleConversationSearch=()=>{};
const searchingUser=()=>{}
const loadingConversations=false
const selectedConversation={_id:2}



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
              [0, 1, 2, 3, 4].map((_, i) => (
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

          {!loadingConversations &&
              [1,2,3,4].map((conversation) => (
                 < Conversesation/>
          ))}
      </Flex>
      {!selectedConversation._id && (
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

      {selectedConversation._id && <MessageContainer/>}
  </Flex>
</Box>
);
}

export default Chat