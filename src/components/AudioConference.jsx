import {
  AudioConference,
  ControlBar,
  LiveKitRoom,
  ParticipantAudioTile,
  ParticipantLoop,
  ParticipantTile,
  RoomAudioRenderer,
  TrackRefContext,
  useLocalParticipant,
  useParticipants,
  useRemoteParticipants,
  useRoomInfo
} from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Text,VStack,GridItem,Badge,AvatarBadge, IconButton, Tooltip, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MdMic, MdMicOff, MdVolumeUp } from 'react-icons/md';
// import { Participant, RoomEvent } from "livekit-client";
import ConferenceUi from "./ConferenceUi";

const serverUrl = 'wss://social-threads-app-8jyllp8e.livekit.cloud';

export default function () {
  const { token: authtoken } = useSelector(state => state.auth);
  const [token, setToken] = useState(null);
 
  const createRoom = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API}/getlivetoken`, {
      headers: { token: authtoken }
    });
    setToken(response.data);
  };

  const joinRoom = async () => {
    const roomName = 'quickstart-room';
    const identity = "meranaam";
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/getlivetoken/new`, {
        roomName,
        identity,
      }, { headers: { token: authtoken } });
      setToken(response.data);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  if (!token) {
    return (
      <>
        <Button onClick={joinRoom}>Join Room</Button>
        <Button onClick={createRoom}>Create Room</Button>
        <h2>Getting token</h2>
      </>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <Box p={4} textAlign="center">
        <Text fontSize="2xl" mb={4}>quickstart-room</Text>
        <RoomAudioRenderer/>
        {/* <AudioConference >  */}
            {/* <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }} gap={4}>  */}
           
            {/* <ParticipantAudioTile onParticipantClick={(e)=>{console.log(e)}} style={{ width: '40px', height: '40px' }}  /> */}
          {/* </Grid> */}
          {/* <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }} gap={4}> */}
            {/* Use ParticipantLoop to render all participants */}
        <ParticipantTracks/>
          {/* </Grid> */}
       {/* </AudioConference> */}
       <ControlBar controls={{audio:true}}/>
      </Box>
      
    </LiveKitRoom>
  );
};


const ParticipantTracks = () => {
 

const  participants=useParticipants()
const room=useRoomInfo()
console.log(participants)
console.log(room)

 


  return (<>{participants.length>0&&<ConferenceUi participants={participants}/>}</>)
}

