
import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex,  Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Button,Image, useDisclosure} from '@chakra-ui/react';
import {BsInstagram} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';
import { Link } from 'react-router-dom';
import { getFollow } from '../Slices/follow';
import { getforFeed, getPostsThunk, getReplies } from '../Slices/postSlice';
import Comment from './comment';
import AddProfile from './AddProfile';



function LoggedUser() {

   const {onOpen,onClose,isOpen}=useDisclosure()
	const dispatch = useDispatch();
	const [mode,setMode]=useState("Threads");
	const user=useSelector(state=>state.auth);
	const followStat=useSelector(state=>state.follow);
	const postState=useSelector(state=>state.post);
	const[imag,setImg]=useState(followStat.userImg)
	const posts=postState.posts;
	// console.log(posts)
    //  console.log(followStat.userImg);
	// console.log(followStat.followers.length);
	console.log(posts);
	useEffect(()=>{
		    if(user.token){
				
				if(mode=="Threads"){
					dispatch(getPostsThunk(user.token));
				}else{
					dispatch(getReplies({token:user.token}));
				}
				
				
			};
            
	},[mode]);
	useEffect(()=>{
		dispatch(getFollow({token:user.token}));
	},[user])
	const setReplies=(type)=>{
    if(mode==type){
		return;
	};
	
	setMode(type);
	};
    // if(postState.pending){
	// 	return <h2>...loading</h2>
	// };


	// const handleFollow=()=>{
	// 	  setisfollowing(true);
	// };
  return (
  <>
  <VStack gap={4} alignItems={"start"}>
  <Flex justifyContent={"space-between"} w={"full"}>
      <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                  {followStat?.username?.length>0&& <>{followStat.username}</>}
            </Text>
            <Flex gap={2} alignItems={"center"}>
                  <Text fontSize={"sm"}>mark</Text>
                  <Text fontSize={"xm"}
                  bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>Threads</Text>
            </Flex>
      </Box>
      <Box >
            <Avatar src={followStat.userImg} name={followStat.username} size={"xl"} onClick={onOpen}  ></Avatar>
			<AddProfile onClose={onClose} isOpen={isOpen} userImg={imag}setImg={setImg}/>
        
      </Box>
      
      </Flex>
     
      <Text>Co founder of executive of facebook</Text>
      <Flex w={'full'} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
               <Text>{`${followStat?.followers?.length} followers`}</Text>
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
				<Flex flex={1} borderBottom={mode=="Threads"?"1.5px solid gray":"1px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"} onClick={()=>{setReplies("Threads")}}>
					<Text fontWeight={"bold"} > Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={mode=="Replies"?"1.5px solid gray":"1px solid white"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
					onClick={()=>{setReplies("Replies")}}
				>
					<Text fontWeight={"bold"} > Replies</Text>
				</Flex>
			</Flex>
    </VStack>
	{postState.pending&&<h2>...loading</h2>}
	{!postState.pending&&posts?.length&& posts.map((post)=>{
		return     <Link to={`/post/${post._id}`}>
		<Flex gap={3} mb={4} py={5}>
			<Flex flexDirection={"column"} alignItems={"center"}>
				<Avatar size='md' name='Mark Zuckerberg' src={post?.userId?.userImg} />
				<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
				<Box position={"relative"} w={"full"}>
					<Avatar
						size='xs'
						name='John doe'
						src='https://bit.ly/dan-abramov'
						position={"absolute"}
						top={"0px"}
						left='15px'
						padding={"2px"}
					/>
					<Avatar
						size='xs'
						name='John doe'
						src='https://bit.ly/sage-adebayo'
						position={"absolute"}
						bottom={"0px"}
						right='-5px'
						padding={"2px"}
					/>
					<Avatar
						size='xs'
						name='John doe'
						src='https://bit.ly/prosper-baba'
						position={"absolute"}
						bottom={"0px"}
						left='4px'
						padding={"2px"}
					/>
				</Box>
			</Flex>
			<Flex flex={1} flexDirection={"column"} gap={2}>
				<Flex justifyContent={"space-between"} w={"full"}>
					<Flex w={"full"} alignItems={"center"}>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{post?.userId.username}
						</Text>
						{/* <Image src='/verified.png' w={4} h={4} ml={1} /> */}
					</Flex>
					<Flex gap={4} alignItems={"center"}>
						<Text fontStyle={"sm"} color={"gray.light"}>
							1d
						</Text>
						<BsThreeDots />
					</Flex>
				</Flex>

				<Text fontSize={"sm"}>{post?.text}</Text>
				    
				{post.media.secure_url&&<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
						<Image src={post.media.secure_url}   w={"full"} />
					</Box>}
				

				<Flex gap={3} my={1}>
					<Actions post={post} key={post._id}/>
				</Flex>

			<Comment post={post} key={post._id}/>
			</Flex>
		</Flex>
	</Link>
	})}

  </>
  )
}

export default LoggedUser;