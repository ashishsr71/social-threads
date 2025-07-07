import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text,
  useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi";
import Conversesation from '../components/Conversesation';
import MessageContainer from '../components/MessageContainer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useSocket from '../hooks/socket';
import SearchConver from '../components/SearchConver';

function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, userId } = useSelector(state => state.auth);
  const socket = useSocket(import.meta.env.VITE_API, userId);

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversesations, setConversesations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState({});
  const [searchingUser, setSearchingUser] = useState(false);
  const [serchText, setSearchText] = useState('');
  const [searched, setSearched] = useState([]);

  const messagesRef = useRef(messages);
  const currentRef = useRef(current);

  // Keep refs in sync with latest state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const sendSeenMessage = async (messageId) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/user/seen`,
      { messageId },
      {
        headers: { token },
        withCredentials: true
      }
    );
    return data;
  };

  // Fetch conversations once
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/user/getconver`, {
      headers: { token }
    }).then(res => {
      setConversesations(res.data);
      setLoadingConversations(false);
    });
  }, []);

  // Socket handlers
  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message) => {
      if (currentRef.current._id === message.conversesationId) {
        setMessages(prev => [...prev, message]);
        setTimeout(() => {
          sendSeenMessage(message._id);
        }, 1000);
      }
    });

    socket.on('seen', (conv) => {
      const newarr = conv.reverse();
      if (currentRef.current._id === newarr[0]?.conversesationId) {
        setMessages(newarr);
      }
    });

    socket.on('sone', (message) => {
      if (currentRef.current._id === message.conversesationId) {
        const updatedMessages = messagesRef.current.map((msg) => {
          if (msg._id === message._id) {
            return { ...msg, seen: true };
          }
          return msg;
        });
        setMessages(updatedMessages);
      }
    });

    return () => {
      socket.off('message');
      socket.off('seen');
      socket.off('sone');
    };
  }, [socket]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (!current._id) return;
    axios.get(`${import.meta.env.VITE_API}/user/getcurrent/${current._id}/${current.userId}`, {
      headers: { token }
    }).then(res => {
      setMessages(res.data);
    });
  }, [current]);

  const handleConversationSearch = async () => {
    setSearchingUser(true);
    if (serchText.length === 0) return;
    const { data } = await axios.get(`${import.meta.env.VITE_API}/search?username=${serchText}`, {
      headers: { token }
    });
    setSearched([...data]);
    onOpen();
    setSearchingUser(false);
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      p={4}
      pb={{ base: "100px", md: "120px" }}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{ sm: "400px", md: "full" }}
        mx={"auto"}
      >
        {/* LEFT: Conversation List */}
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
            Your Conversations
          </Text>

          <form onSubmit={e => { e.preventDefault(); handleConversationSearch(); }}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder='Search for a user'
                value={serchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>

          <SearchConver
            searched={searched}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            setSelectedConversation={setCurrent}
            current={current}
            conversesations={conversesations}
            setConverseations={setConversesations}
          />

          {loadingConversations &&
            [0, 1, 2, 3].map((_, i) => (
              <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))
          }

          {conversesations.length > 0 &&
            conversesations.map((conversation, i) => (
              <Conversesation
                key={conversation._id || i}
                conversation={conversation}
                setSelectedConversation={setCurrent}
              />
            ))
          }
        </Flex>

        {/* RIGHT: Message Container */}
        {!current._id ? (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
        ) : (
          <MessageContainer
            messages={messages}
            socket={socket}
            current={current}
            setMessages={setMessages}
          />
        )}
      </Flex>
    </Box>
  );
}

export default Chat;

