import React, { useEffect, useState } from 'react'
import { Text,Box,Flex ,Icon} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllcomments } from '../Slices/commentSlice';


function Comment({post}) {
const [open,setOpen]=useState(false);

const dispatch= useDispatch();
const token=useSelector(state=>state.auth.token);
const comState=useSelector(state=>state.comment);
const postState=useSelector(state=>state.post)
const [comments,setCom]=useState([]);
const [likes,setLikes]=useState(0);
// console.log(post._id)
// const comments= comState.allComments;
 useEffect(()=>{
 axios.get(`${import.meta.env.VITE_API}/user/getcomments/${post._id}`,{headers:{token}}).then(res=>{
  // console.log(res.data)
  setCom(res.data)});

 },[comState]);
  



const handleOpen=()=>{
  setOpen(!open);
};


  return (
    <>
    <Flex gap={2} alignItems={"center"}>
    {comments.length >0&&  <Text color={"gray.light"} fontSize='sm' onClick={handleOpen}>
{comments.length} replies
      </Text>}
      <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text color={"gray.light"} fontSize='sm'>
  {post.likes.length&&<>{post.likes.length}</>} likes
 
      </Text>
    
    </Flex>
   </>
  )
}

export default Comment;

