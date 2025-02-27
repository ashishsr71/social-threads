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
import { Box, Button, Text, HStack, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";


import ConferenceUi from "./ConferenceUi";
import { Track } from "livekit-client";
import { useParams } from "react-router-dom";
// Input
const serverUrl = 'wss://social-threads-app-8jyllp8e.livekit.cloud';

export default function () {
  const {roomId}=useParams();
  const { token: authtoken } = useSelector(state => state.auth);
  const [token, setToken] = useState(null);
 const [roomName,setRoomName]=useState("");
 const[isOpen,setIsOpen]=useState(false);
  const createRoom = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API}/getlivetoken`,{roomName}, {
      headers: { token: authtoken }
    });
    setToken(response.data);
    setRoomName("")
  };

  const joinRoom = async (roomId) => {
   
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/getlivetoken/new`, {
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
      <Box>
        <HStack wrap="wrap" gap={12}>
        <Button onClick={()=>{
          joinRoom(roomId);
        }}>Join Room</Button>
      <Button onClick={()=>{setIsOpen(prev=>!prev)}}>Create Room</Button></HStack></Box>
        {isOpen&&<Input value={roomName} type="text" placeholder="enter space name" my={8} onChange={(e)=>{setRoomName(e.target.value)}}></Input>}
        <Button size={"md"} px={10} my={5} onClick={()=>{
          if(roomName.length<3){
            return
          }
          createRoom()
        }}>Create</Button>
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

 


  return (<>{participants.length>0&&<ConferenceUi participants={participants} room={room}/>}</>)
}

