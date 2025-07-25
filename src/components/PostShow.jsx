import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { Avatar, Box, Flex,  Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Image} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserPost, getSinlgePost } from '../Slices/postSlice';
import { getUser } from '../Slices/follow';
import Comment from './comment';


function PostShow() {
	const dispatch=useDispatch();
const {userid}=useParams();
   const token=useSelector(state=>state.auth.token);
    const postState=useSelector(state=>state.post);
  const posts=postState.posts;
	// console.log(posts)
useEffect(()=>{
	if(token){
		// dispatch(getUser({token,id}));
 dispatch(getOtherUserPost({token,id:userid}));
};
},[]);

if(postState.pending){
	return <h2>...loading</h2>
};
 
  return (
        <>   
	{posts?.length&& posts.map((post)=>{
		return<Link to={`/post/${post._id}`}> <Flex gap={3} mb={4} py={5}>
		<Flex flexDirection={"column"} alignItems={"center"}>
			<Avatar size='md' name={post.userId.username}src={post.userId.userImg} />
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
				{ post?.userId?.username && <>{post.userId?.username}</>  }
				
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
			 
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={post?.media?.secure_url} w={"full"} />
				</Box>
			

			<Flex gap={3} my={1}>
				<Actions post={post} key={post._id} />
			</Flex>

			<Comment post={post}/>
		</Flex>
	</Flex></Link>
	})	}
		</>
  )
};

export default PostShow;