import {
  AudioConference,
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    
    useTracks,
   RoomAudioRenderer 
  } from "@livekit/components-react";
  import "@livekit/components-styles";
  import { Track } from "livekit-client";
import axios from "axios";
// import { Room } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";



const serverUrl = 'wss://social-threads-app-8jyllp8e.livekit.cloud';


export default function (){
// const trackRef=useRef();
// const [audio,setAudio]=useState(null);
const {token:authtoken}=useSelector(state=>state.auth);
const[token,setToken]=useState(null)

// useEffect(()=>{
//     navigator.mediaDevices
//     .getUserMedia({ audio: true})
//     .then((stream) => {
//     setAudio(stream)
//     console.log(stream)
//     trackRef(stream)})

// },[])
const createRoom=async()=>{
  const response=await  axios.get(`${import.meta.env.VITE_API}/getlivetoken`,{headers:{token:authtoken}});
  setToken(response.data)
};

const joinRoom = async () => {
    const roomName='quickstart-room';
    const identity="meranaam"
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/getlivetoken/new`, {
        roomName,
        identity,
      },{headers:{token:authtoken}});
      console.log(response.data)
      setToken(response.data);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };


if(!token){
    return (<>
    <Button onClick={joinRoom}>joinroom</Button>
    {"    "}
    <Button onClick={createRoom}>createroom</Button>
    <h2>getting token</h2></>)
}
    return (<LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
     
       {/* <RoomAudioRenderer /> */}
    <Box p={4} textAlign="center">
      <Text fontSize="2xl" mb={4}>quickstart-room</Text>
<AudioConference>
<Grid templateColumns={{base:'repeat(2,1fr)',md:'repeat(4,1fr)'}} gap={4} autoRows="1fr"> 
<ParticipantTile/>
</Grid>


</AudioConference>

    </Box>
     {/* <ParticipantTracks/>  */}
    
    
      {/* <ControlBar />   */}
 
        </LiveKitRoom>
    )

};


const ParticipantTracks = () => {
  // const trackRef=useEnsureTrackRef()

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
    
    
    
     
    
   
      )
  };

