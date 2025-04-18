import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex,  Text,Image, Button} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSinlgePost } from '../Slices/postSlice';
import ShowComment from './ShowComment';
import { useBreakpointValue } from "@chakra-ui/react";
import axios from 'axios';
import useShowToast from '../hooks/useShowToast';

function SinglePost() {
	const menuPosition = useBreakpointValue({ base: { top: "100", left: "53" }, md: { top: "200px", left: "150" } });
    const navigate=useNavigate();
    const [liked,setliked]=useState(true)
    const dispatch=useDispatch();
    const {id}=useParams();
    const {token,userId}=useSelector(state=>state.auth);
    const postState =useSelector(state=>state.post);
    const post =postState.currentPost;
	const toast=useShowToast();
	const [open,setOpen]=useState(false);

    useEffect(()=>{
        dispatch(getSinlgePost({token,id}));
    },[])
    
const deletePost=async(postId)=>{
if(!post.userId._id==userId)return;
try {
	const response=await axios.delete(`${import.meta.env.VITE_API}/user/deletepost/${postId}`,{withCredentials:true,headers:{
		token
	}});
	navigate("..")
	console.log(response.data);
} catch (error) {
	toast("error deleting","something went wrong");
	console.log("error in deleting post" + error);
}


};	



  return (<>{!postState.pending&&post &&<Flex gap={3} mb={4} py={5}>
		<Flex flexDirection={"column"} alignItems={"center"}>
			<Avatar size='md' name='Mark Zuckerberg' src={post.userId.userImg} />
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
				<Link to={`/user/${post.userId._id}`}>	<Text fontSize={"sm"} fontWeight={"bold"}>
				{ post?.userId.username && <>{post.userId.username}</>  }
				
					</Text></Link>
					{/* <Image src='/verified.png' w={4} h={4} ml={1} /> */}
				</Flex>
				<Flex gap={4} alignItems={"center"}>
					<Text fontStyle={"sm"} color={"gray.light"}>
						1d
					</Text>
					<BsThreeDots cursor="pointer" onClick={()=>{setOpen(!open)
						
					}}/>
               
				</Flex>
			</Flex>

			<Text fontSize={"sm"}>{post?.text}</Text>
			 
				<Box position="relative" borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
				{open&&<Flex position="absolute" direction={'column'} w={{ base: "150px", md: "200px" }} zIndex={50} top={menuPosition?.top} left={menuPosition?.left} bg="black" borderRadius={20} wrap={"wrap"} maxH={{ base: "200px", md: "300px" }} justifyContent={"space-between"}  >
				{post.userId._id==userId&&<Button  maxW={100} alignSelf={"center"} m={2} onClick={()=>{
					deletePost(post._id)
					}} >Delete</Button>}
				{post.userId._id==userId&&<Button  maxW={100} alignSelf={"center"} m={2} >Update</Button>}
				<Button  maxW={100} alignSelf={"center"} m={2} >Repost</Button>
				</Flex>}
					<Image src={post?.media?.secure_url} w={"full"} />
				</Box>
			

			<Flex gap={3} my={1}>
				<Actions liked={liked} setLiked={setliked} post={post} />
			</Flex>

		<ShowComment post={post} />
		</Flex>
	</Flex>}</>
   
  )
}

export default SinglePost;
