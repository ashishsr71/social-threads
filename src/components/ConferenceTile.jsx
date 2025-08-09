import { Box, HStack, Avatar, Text, Flex, Link } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
// Link
function ConferenceTile({item}) {
  return (<>
     <Link as={RouterLink} to={`/live/${item._id}`}>
                <HStack
                  key={item.id}
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  borderRadius="xl"
                  px={4}
                  py={2}
                  alignItems="center"
                  minW="250px"
                  color="white"
                  whileTap={{ cursor: "grabbing" }}
                >
                 
                  <HStack spacing={-2}>
                 
                    {item.participants.length>0&&item?.users?.map((user,i) => (<>
                     {i<4||user.role=="Host" && <Avatar key={user.userId} src={user.imgUrl} size="sm" border="2px solid white" />}
                     </>))}
                  </HStack>
                  <Text fontSize="sm" isTruncated>
                    {item.roomName}
                  </Text>
                  <ChevronRightIcon boxSize={5} />
                </HStack></Link>
      
  </>)
}

export default ConferenceTile;