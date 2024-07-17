import React, { useEffect, useState } from 'react'
import { Text,Box,Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Comment({post}) {
const [comments,setComments]=useState([]);

const token=useSelector(state=>state.auth.token);

 useEffect(()=>{
 axios.get(`http:/${import.meta.env.VITE_API}/user/getcomments/${post._id}`,{headers:{token}}).then(res=>{
  console.log(res.data)
  setComments(res.data)});
 },[])
  



  return (
    <>
    <Flex gap={2} alignItems={"center"}>
    {comments.length >0&&  <Text color={"gray.light"} fontSize='sm'>
{comments.length} replies
      </Text>}
      <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text color={"gray.light"} fontSize='sm'>
  {post.likes.length&&<>{post.likes.length}</>} likes
 
      </Text>
    </Flex></>
  )
}

export default Comment;
