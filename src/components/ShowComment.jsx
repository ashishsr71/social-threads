import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllcomments } from '../Slices/commentSlice';
import { Text,Box,Flex ,Icon} from '@chakra-ui/react';
import { FiCornerUpLeft } from 'react-icons/fi';




function ShowComment({post}) {
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.auth);
const comments=useSelector(state=>state.comment.allComments);

    useEffect(()=>{
   dispatch(getAllcomments({id:post._id,token}));
    },[]);
  return (
    <Box p={4}>
    <Flex direction='column'>
    { comments.length>0&&comments.map(comment=>{return <ColumnWithReplyIcon text={comment?.replie} by={comment.by}/>  }) }    </Flex></Box>
  )
}

export default ShowComment;

      
      
const ColumnWithReplyIcon = ({ text ,by}) => (
    <Flex direction="row" align="center" p={4} borderWidth={1} borderRadius="md" m={2}>
      <Text position="relative" top={-15} left={-2} >{by.username}</Text>
      <Flex direction="row" align="center">
      <Text mb={2} ml={4}>{text}</Text>
      <Icon as={FiCornerUpLeft} mt={-2} ml={2} alignSelf='center'/></Flex>
    </Flex>
  );
  