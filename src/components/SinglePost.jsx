import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex,  Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack ,Image} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSinlgePost } from '../Slices/postSlice';

function SinglePost() {
    const [liked,setliked]=useState(true)
    const dispatch=useDispatch();
    const {id}=useParams();
    const token=useSelector(state=>state.auth.token);
    const post =useSelector(state=>state.post.currentPost);

    useEffect(()=>{
        dispatch(getSinlgePost({token,id}));
    },[])

  return (<>{post &&<Flex gap={3} mb={4} py={5}>
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
				username
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

			<Text fontSize={"sm"}>asdfasdf</Text>
			 
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={post?.media?.secure_url} w={"full"} />
				</Box>
			

			<Flex gap={3} my={1}>
				<Actions liked={liked} setLiked={setliked} />
			</Flex>

			<Flex gap={2} alignItems={"center"}>
				<Text color={"gray.light"} fontSize='sm'>
200 replies
				</Text>
				<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
				<Text color={"gray.light"} fontSize='sm'>
		422 likes
				</Text>
			</Flex>
		</Flex>
	</Flex>}</>
   
  )
}

export default SinglePost;