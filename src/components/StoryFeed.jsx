import { Box, HStack, VStack, Avatar, Text,Icon } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
export default function StoryFeed(){
      const stories = [
            { name: 'Alice', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Bob', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Charlie', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Dave', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Eve', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Eve', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Eve', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
          ];
          function handleAddStory(){}
      return (
            <Box overflowX="scroll" p={4} borderWidth="1px" borderRadius="lg">
            <HStack spacing={4}>
            <VStack onClick={handleAddStory} cursor="pointer">
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            border="2px solid"
            borderColor="gray.300"
            p="2px"
            bg="gray.200"
            width="80px"
            height="80px"
          >
            <Icon as={FaPlus} boxSize={8} color="gray.600" />
          </Box>
          <Text>Add Story</Text>
        </VStack>
              {stories.map((story, index) => (
                <VStack key={index} >
                     <Box
              borderRadius="full"
              border="2px solid"
              borderColor="pink.500"
              p="2px"
            >
              <Avatar size="xl" src={story.src} onClick={()=>{console.log("hii")}} />
            </Box>
                  <Text>{story.name}</Text>
                </VStack>
              ))}
            </HStack>
          </Box>
      )
}