import {
  AudioConference,
  LiveKitRoom,
  ParticipantTile,
} from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "axios";
import { useState } from "react";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

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
        <AudioConference>
          <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }} gap={4}>
            {/* ParticipantTile with custom styling for smaller size */}
            <ParticipantTile style={{ width: '80px', height: '80px' }} />
          </Grid>
        </AudioConference>
      </Box>
    </LiveKitRoom>
  );
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

