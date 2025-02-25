import React from 'react'
import { Box, Grid, Avatar, Text, Badge, IconButton, Flex,keyframes } from "@chakra-ui/react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { DisconnectButton } from '@livekit/components-react';
// import { RoomEvent } from 'livekit-client';
import axios from 'axios';
import { useSelector } from 'react-redux';

const pulseRing = keyframes`
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(72, 187, 255, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(72, 187, 255, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(72, 187, 255, 0);
  }
`;

const ConferenceUi = ({participants}) => {
    const {token}=useSelector(state=>state.auth)
    // const [host,setHost]=useState("")
    let isHost;
    if(participants[0].metadata){
      isHost= JSON.parse(participants[0].metadata).role;
    };
    
    const handleMute = async (participantIdentity) => {
        if(isHost!="host")return;
        await axios.post(`${import.meta.env.VITE_API}/mute`, {  roomName:"quickstart-room", participantIdentity ,isHost}, {
            headers: { token }
          });
        console.log(`Muted ${participantIdentity}`);
      };
        
      const handleUnmute = async (participantIdentity) => {
        if(isHost!="host")return;
        await axios.post(`${import.meta.env.VITE_API}/unmute`, { roomName:"quickstart-room", participantIdentity,isHost }, {
            headers: { token }
          });
        console.log(`Unmuted ${participantIdentity}`);
      };

    return (
        <Box bg="black" color="white" p={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Dantley Davis's space
          </Text>
          <Text fontSize="sm" color="purple.400" mt={1}>
            Spaces update + what's coming soon!
          </Text>
    
          <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={4}>
            {participants.map((user, index) => (
              <Box key={index} textAlign="center">
                <Flex
                  position="relative"
                  justify="center"
                  animation={user.isSpeaking ? `${pulseRing} 2s infinite` : "none"}
                  borderRadius="full"
                >
                  <Avatar name={user.name} size="lg" />
                  {!user?.permissions?.canPublish && (
                    <IconButton onClick={()=>{handleUnmute(user.identity)}}
                      icon={<FiMicOff />}
                      aria-label="Muted"
                      size="xs"
                      colorScheme="purple"
                      position="absolute"
                      bottom="0"
                      right="0"
                      isRound
                    />
                  )}
                      {user?.permissions?.canPublish && (
                    <IconButton onClick={()=>{handleMute(user.identity)}}
                      icon={<FiMic/>}
                      aria-label="Muted"
                      size="xs"
                      colorScheme="purple"
                      position="absolute"
                      bottom="0"
                      right="0"
                      isRound
                    />
                  )}
                </Flex>
                <Text fontSize="sm" mt={2} isTruncated>
                  {user.identity}
                </Text>
                <Badge colorScheme={isHost === "host" ? "red" : "purple"} fontSize="0.6em">
                  
                  {user?.permissions?.canPublish&&<>Speaker</>}
                  {!user?.permissions?.canPublish&&<>Listener</>}
                </Badge>
              </Box>
            ))}
          </Grid>
    
          <Text color="red.400" fontSize="md" mt={6} cursor="pointer">
            <DisconnectButton>leave</DisconnectButton>
          </Text>
        </Box>
      );
    }

export default ConferenceUi;