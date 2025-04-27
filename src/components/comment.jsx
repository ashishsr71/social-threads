import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaRegComment, FaHeart, FaRetweet, FaShare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Comment({ post }) {
  const [comments, setComments] = useState([]);
  const token = useSelector(state => state.auth.token);
  const comState = useSelector(state => state.comment);
  const postState = useSelector(state => state.post);
  const po = postState.posts.find(p => p._id === post._id);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/user/getcomments/${post._id}`, {
        headers: { token },
      })
      .then(res => {
        setComments(res.data);
      });
  }, [comState]);

  return (
    <Flex
      mt={2}
      gap={6}
      color="gray.500"
      fontSize="sm"
      align="center"
    >
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        _hover={{ color: 'gray.300' }}
      >
        <Icon as={FaRegComment} boxSize={3.5} />
        {comments.length > 0 && <Text>{comments.length}</Text>}
      </Flex>

      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        _hover={{ color: 'gray.300' }}
      >
        <Icon as={FaRetweet} boxSize={3.5} />
      </Flex>

      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        _hover={{ color: 'gray.300' }}
      >
        <Icon as={FaHeart} boxSize={3.5} />
        <Text>{po?.likes.length || 0}</Text>
      </Flex>

      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        _hover={{ color: 'gray.300' }}
      >
        <Icon as={FaShare} boxSize={3.5} />
      </Flex>
    </Flex>
  );
}

export default Comment;
  