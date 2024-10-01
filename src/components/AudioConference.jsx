import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
    useParticipants
  } from "@livekit/components-react";
  import "@livekit/components-styles";
  import { Track } from "livekit-client";
import axios from "axios";
// import { Room } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";

const serverUrl = 'wss://social-threads-app-8jyllp8e.livekit.cloud';


export default function (){
const trackRef=useRef();
const [audio,setAudio]=useState(null);
const[token,setToken]=useState(null)
useEffect(()=>{
    navigator.mediaDevices
    .getUserMedia({ audio: true})
    .then((stream) => {
    setAudio(stream)
    console.log(stream)
    trackRef(stream)})

},[])
const createRoom=async()=>{
  const response=await  axios.get('http://localhost:4000/getlivetoken');
  setToken(response.data)
};

const joinRoom = async () => {
    const roomName='quickstart-room';
    const identity="meranaam"
    try {
      const response = await axios.post('http://localhost:4000/getlivetoken/new', {
        roomName,
        identity,
      });
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
    return (
        <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      {/* <MyAudioConference /> */}
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      {/* <RoomAudioRenderer /> */}
      <ParticipantTracks/>
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
 
        </LiveKitRoom>
    )

};


const ParticipantTracks = () => {
    const { participants } = useParticipants();
  
    return (
      <div>
        {participants?.map((participant) => (
          <div key={participant.identity}>
            <h3>{participant.identity}</h3>
            {participant.tracks.map((track) =>
              track.source === 'microphone' ? (
                <AudioTrack key={track.sid} track={track.track} />
              ) : null
            )}
          </div>
        ))}
      </div>
    );
  };

