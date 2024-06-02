import { Box, HStack, VStack, Avatar, Text,Icon } from '@chakra-ui/react';



import { FaPlus } from 'react-icons/fa';
import Edit from './Edit';
import { useState } from 'react';
import { useSelector } from 'react-redux';




// component starts here
export default function StoryFeed(){
  const [isOpen,setModal] =useState(false);
  const storie= useSelector(state=>state.story.stories);
  console.log(storie);
      const stories = [
            { name: 'Alice', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Bob', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Charlie', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Dave', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Eve', src: 'https://via.placeholder.com/150',stori:[{src:''}] },
            { name: 'Eve', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
            { name: 'Eve', src: 'https://via.placeholder.com/150' ,stori:[{src:''}]},
          ];
          function handleAddStory(){
            setModal(!isOpen);
          }
      return (
        <>
         <Edit isOpen={isOpen} onClose={setModal}/>
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
              {storie.map((story, index) => (
                <VStack key={index} >
                     <Box
              borderRadius="full"
              border="2px solid"
              borderColor="pink.500"
              p="2px"
            >
             
              <Avatar size="xl" src={story.userimg} onClick={()=>{console.log("hii")}} />
            </Box>
                  <Text>{story.userid}</Text>
                </VStack>
              ))}
            </HStack>
          </Box>
          </>
      )
}