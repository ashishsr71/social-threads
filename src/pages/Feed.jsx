import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions';
import StoryFeed from '../components/StoryFeed';
import { Avatar, Box, Flex,  Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Image} from '@chakra-ui/react';
import { logout } from '../Slices/Auith';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getPostsThunk } from '../Slices/postSlice';
import { getforFeed } from '../Slices/postSlice';
import { Link } from 'react-router-dom';
import Comment from '../components/comment';

// components starts here
function Feed() {
  const [liked,setliked] =useState(false)
 const user= useSelector(state=>state.auth);
 const postState= useSelector(state=>state.post);
 const posts= postState.posts;	
//  console.log(posts)
  const dispatch= useDispatch();

useEffect(()=>{
	if(user.token&&user.userId){
		console.log(posts)
		dispatch( getforFeed({token:user.token}));
	}



},[]);
if(postState.pending){
	return <h2>....loading</h2>
}

  
 
  return (<>
  {!user.token && <Navigate to='/login'/>}

	<StoryFeed />
	{posts.length&& posts.map((post)=>{
			return<Link to={`/post/${post._id}`}>
			<Flex gap={3} mb={4} py={5}>
		
			<Flex flexDirection={"column"} alignItems={"center"}>
				<Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
				<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
				<Box position={"relative"} w={"full"} cursor={'pointer'

				}>
					
				</Box>
			</Flex>
			<Flex flex={1} flexDirection={"column"} gap={2}>
				<Flex justifyContent={"space-between"} w={"full"}>
					<Flex w={"full"} alignItems={"center"}>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							markzuckerberg
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
                  {post?.text && <Text fontSize={"sm"}>{post.text}</Text>}
				
				 
					<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
	                   {post?.media &&<Image src={post.media?.secure_url} w={"full"} h={"30vh"} overflow={"hidden"}/> }
						
					</Box>
				

				<Flex gap={3} my={1}>
					<Actions liked={post?.likes.includes(user.userId)} post={post} setLiked={setliked} key={post._id}/>
				</Flex>

				<Comment post={post} key={post._id}/>
			</Flex>
		</Flex></Link> 
		})}
	
    
			</> )
}

export default Feed;
