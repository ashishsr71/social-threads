import React, { useState } from 'react'
import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Button} from '@chakra-ui/react';
import {BsInstagram} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UseHeader() {
//     this the user whom to follow
      const {userid}=useParams();
      console.log(userid)
      const user=useSelector(state=>state.auth.userId);
      const followStat=useSelector(state=>state.follow);
      const isFollowing=followStat.following.includes(userid);
      // handle follow unfollow
      const handleFollow=()=>{
        
      };
  return (
    <VStack gap={4} alignItems={"start"}>
  <Flex justifyContent={"space-between"} w={"full"}>
      <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Mark sukerbag
            </Text>
            <Flex gap={2} alignItems={"center"}>
                  <Text fontSize={"sm"}>mark</Text>
                  <Text fontSize={"xm"}
                  bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>Threads</Text>
            </Flex>
      </Box>
      <Box >
            <Avatar name='mark jukerbak' size={"xl"}></Avatar>
        
      </Box>
      
      </Flex>
       <Button
      onClick={handleFollow}
      colorScheme={isFollowing ? 'green' : 'blue'}
      variant="outline"
      size="md"
      fontWeight="normal"
      borderRadius="md"
      _hover={{ bg: isFollowing ? 'green.400' : 'blue.400' }}
      _focus={{ boxShadow: 'none' }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
      <Text>Co founder of executive of facebook</Text>
      <Flex w={'full'} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
               <Text>3.2k followers</Text>
               <Box w={1} bg={"gray.light"}
               h={1} borderRadius={"full"}></Box>
               <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
             <Box className='icon-container'>
                  <BsInstagram size={24} cursor={'pointer'}/> </Box> 
                  <Box className='icon-container'>
                        <Menu>
                              <MenuButton>
                        <CgMoreO size={"24"} cursor={"pointer"}/>
                        </MenuButton>
                        <Portal>
                              <MenuList>
                                    <MenuItem>
                                    Copy Link 
                                    </MenuItem>
                              </MenuList>
                        </Portal>
                        </Menu>
                        </Box>
                     
            </Flex>
                  
      </Flex> 
      <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
    </VStack>
  )
}

export default UseHeader;
