import React from 'react'
import { Box, Button, Icon,Avatar,Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";




// component starts here
function Cards() {
  return (
    <Box position="relative" display="flex" alignItems="center" justifyContent="center" flexDirection="row" width="100%">
      
      <Button colorScheme="blue" variant="outline" p="2" mb="2">
        <Icon as={ChevronLeftIcon} w={6} h={6} />
      </Button>
      <Box
        bg="rgba(0,0,0,0.9)" // Darker background color
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        width="240px" // Width
        minHeight="400px" // Height
        textAlign="center"
        zIndex="0"
      >
       
        <Box position="absolute" top="8px" display='flex' zIndex="1">
        <Avatar size="sm" src='' />
        <Text fontSize="sm" color="white" ml="2" >ashish</Text>
      </Box>
        {/* {mediaSrc.endsWith(".mp4") ? (
          <video width="100%" height="100%" controls>
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={mediaSrc} alt="Media" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        )} */}
      </Box>
      <Button colorScheme="blue" variant="outline" p="2" mt="2">
        <Icon as={ChevronRightIcon} w={6} h={6} />
      </Button>
    </Box>

  )
}

export default Cards