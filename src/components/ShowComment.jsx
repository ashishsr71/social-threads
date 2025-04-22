import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcomments } from '../Slices/commentSlice';
import {
  Box,
  Flex,
  Icon,
  Text,
  Avatar
} from '@chakra-ui/react';
import { FiCornerUpLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function ShowComment({ post }) {
  const dispatch = useDispatch();
  const { token ,userId} = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.comment.allComments);

  useEffect(() => {
    dispatch(getAllcomments({ id: post._id, token }));
  }, [dispatch, post._id, token]);

  return (
    <Box pt={2}>
      <Flex direction="column">
        {comments.length > 0 &&
          comments.map((comment) => (
            <ColumnWithReplyIcon
              key={comment._id}
              text={comment?.replie}
              by={comment?.by}
              userId={userId}
            />
          ))}
      </Flex>
    </Box>
  );
}

export default ShowComment;

const ColumnWithReplyIcon = ({ text, by ,userId}) => (
  <Flex
    direction="row"
    align="flex-start"
    px={4}
    py={3}
    borderBottom="1px solid"
    borderColor="gray.700"
    gap={3}
  >
    {/* Optional: Avatar placeholder */}
    <Avatar
      name={by?.username}
      size="sm"
      bg="gray.600"
      color="white"
      
    />
    <Flex direction="column" flex="1">
      <Flex align="center" gap={1}>
        <Link to={userId==by.userId?`/profile`:`/user/${by.userId}`}><Text fontWeight="bold" fontSize="sm">
          {by?.username}
        </Text></Link>
        <Icon as={FiCornerUpLeft} boxSize={3} color="gray.500" cursor={'pointer'} />
      </Flex>
      <Text fontSize="sm" color="gray.300" mt={1}>
        {text}
      </Text>
    </Flex>
  </Flex>
);
