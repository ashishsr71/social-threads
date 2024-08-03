import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex,  Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Image} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSinlgePost } from '../Slices/postSlice';
import ShowComment from './ShowComment';


function SinglePost() {
    const [liked,setliked]=useState(true)
    const dispatch=useDispatch();
    const {id}=useParams();
    const token=useSelector(state=>state.auth.token);
    const postState =useSelector(state=>state.post);
    const post =postState.currentPost;
    useEffect(()=>{
        dispatch(getSinlgePost({token,id}));
    },[])
     
  return (<>
  {/* {postState.pending&& <h2>...loading</h2>} */}
  {post&& !postState.pending &&<Flex gap={3} mb={4} py={5}>
		<Flex flexDirection={"column"} alignItems={"center"}>
			<Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
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
				<Link to={`/user/${post.userId}`}>	<Text fontSize={"sm"} fontWeight={"bold"}>
				{ post?.username && <>{post.username}</>  }
				
					</Text></Link>
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
				<Actions liked={liked} setLiked={setliked} post={post} />
			</Flex>

		<ShowComment post={post} />
		</Flex>
	</Flex>}</>
   
  )
}

export default SinglePost;
