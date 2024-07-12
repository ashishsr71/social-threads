import { Box, HStack, VStack, Avatar, Text,Icon } from '@chakra-ui/react';



import { FaPlus } from 'react-icons/fa';
import Edit from './Edit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storythunk } from '../Slices/storyslice';
import StoryOpen from './StoryOpen';


// component starts here
export default function StoryFeed(){

  const [isOpen,setModal] =useState(false);
  const [status,setStatus]=useState({open:false,current:0});
  const storyStatus= useSelector(state=>state.story);
  const storie=storyStatus.stories;
  const user=useSelector(state=>state.auth)
  console.log(storie);
  const dispatch=useDispatch();
useEffect(()=>{
dispatch(storythunk({token:user.token}));

},[])
     
          function handleAddStory(){
            setModal(!isOpen);
          };

      return (
        <>
         <Edit isOpen={isOpen} onClose={setModal}/>
            <Box overflowX="scroll"
             borderWidth="1px" borderRadius="lg">
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
              {storie?.length&&storie?.map((str, index) => <>
                <VStack key={index} >
                     <Box
              borderRadius="full"
              border="2px solid"
              borderColor="pink.500"
              p="2px"
            >
             
              <Avatar size="xl" src={str.video?.secure_url} onClick={()=>{setStatus({open:!status.open,current:index})}} />
            </Box>
                  <Text>{str?.stories[0]?.username}</Text>
                </VStack>
                 </>)
              
              }
            </HStack>
          </Box>
        {status.open && <StoryOpen setStatus={setStatus} status={status}/>}
          </>
      )
};