import {
  AudioConference,
  ControlBar,
  LiveKitRoom,
  ParticipantAudioTile,
  ParticipantLoop,
  ParticipantTile,
  RoomAudioRenderer,
  TrackRefContext,
  TrackToggle,
  useLocalParticipant,
  useParticipants,
  useRemoteParticipants,
  useRoomInfo
} from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "axios";
import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";


import ConferenceUi from "./ConferenceUi";
import { Track } from "livekit-client";

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

  const joinRoom = async (roomId) => {
    const roomName = 'quickstart-room';
    const identity = "meranaam";
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/getlivetoken/new`, {
        roomName,
        identity,
        roomId
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
       
        <ParticipantTracks/>
       <TrackToggle source={Track.Source.Microphone} initialState={false}/>
       {/* <ControlBar controls={{audio:true}}/> */}
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

