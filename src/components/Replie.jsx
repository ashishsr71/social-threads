import React from "react";
import { Box, Text, HStack, Avatar, VStack } from "@chakra-ui/react";
// import { MessageSquare } from "lucide-react"; 

const Reply = ({ replyText, repliedTo ,post,to,userImg}) => {
  return (
    <Box
      bg="gray.800"
      borderRadius="lg"
      p={4}
      maxW="600px"
      border="1px solid #2d2d2d"
      boxShadow="md"
      _hover={{ bg: "gray.700" }}
      transition="background 0.2s ease"
    >
      <HStack align="start" spacing={4}>
        <Avatar size="sm" name={userImg} />

        <VStack align="start" spacing={1}>
            
          <Text fontSize="sm" color="gray.400">
            Replying to {to.length>0&&to.map((user)=>(<Text as="span" color="blue.400">@{user.name}</Text>))}
            {!to.length>0&&<Text as="span" color="blue.400">@{post.userId.username}</Text>}
          </Text>

          <Text fontSize="md" color="white">
            {replyText}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Reply;
