import React, { useEffect, useRef, useState } from 'react';
import {Flex, useBreakpointValue} from '@chakra-ui/react'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
function VideoCall({isOpen,onClose,socket,current}) {

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
    const userId=useSelector(state=>state.auth.userId);
    const {username}=useSelector(state=>state.follow)

  //   const iceServers = {
  //     iceServers: [
  //         { urls: 'stun:stun.l.google.com:19302' }, 
         
  //     ]
  // };
  
 
  // const peerConnection = new RTCPeerConnection(iceServers);
useEffect(()=>{
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((currentStream) => {
    setStream(currentStream);

    myVideo.current.srcObject = currentStream;
  }).catch(error=>console.log(error));
  socket.on('calluser', ({ from,  name: callerName, signal }) => {
    console.log(from,callerName)
    setCall({ isReceivingCall: true, from, name: callerName, signal });
  });
  return()=>{
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }
},[]);

const answerCall=()=>{
  setCallAccepted(true);

  const peer = new Peer({ initiator: false, trickle: false, stream });
  peer.on('signal', (data) => {
    socket.emit('answerCall', { signal: data, userId:call.from });
  });

  peer.on('stream', (currentStream) => {
    userVideo.current.srcObject = currentStream;
  });

  peer.signal(call.signal);

  connectionRef.current = peer;
};

const callUser=()=>{
  
  const peer = new Peer({ initiator: true, trickle: false, stream });
console.log(peer)
  peer.on('signal', (data) => {
    socket.emit('calluser', { toWhom:current?.userId, signalData: data, from: userId, name:username });
  });

  peer.on('stream', (currentStream) => {
    userVideo.current.srcObject = currentStream;
  });

  socket.on('callAccepted', (signal) => {
    setCallAccepted(true);

    peer.signal(signal);
  });

  connectionRef.current = peer;
};
const leaveCall=()=>{ setCallEnded(true);

  connectionRef.current.destroy();
  myVideo.current=null;
  
onClose();
}
    // useEffect(() => {
     
    //   async function init() {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //     setLocalStream(stream);
    //     localVideoRef.current.srcObject = stream;

    //     const pc = new RTCPeerConnection(iceServers);
    //     stream.getTracks().forEach(track => pc.addTrack(track, stream));
    //     peerConnectionRef.current = pc;

    //     pc.onicecandidate = event => {
    //         if (event.candidate) {
    //             socket.emit('ice-candidate', { candidate: event.candidate, roomId: '1234' });
    //         }
    //     };

    //     pc.ontrack = event => {
    //         setRemoteStream(event.streams[0]);
    //         remoteVideoRef.current.srcObject = event.streams[0];
    //     };
    // };

    // socket.emit('join-room', '1234');

    // socket.on('offer', async (sdp) => {
    //     await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    //     const answer = await peerConnectionRef.current.createAnswer();
    //     await peerConnectionRef.current.setLocalDescription(answer);
    //     socket.emit('answer', { sdp: peerConnectionRef.current.localDescription, roomId: '1234' });
    // });

    // socket.on('answer', async (sdp) => {
    //     await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    // });

    // socket.on('ice-candidate', async (candidate) => {
    //     await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    // });
    // init();
    
    // return () => {
    //   // Cleanup function to be called on component unmount

    //   // Close all peer connections
    //   if(peerConnectionRef.current){     Object.values(peerConnectionRef.current).forEach(pc => pc.close());}
 

    //   // Stop all local media tracks
    //   if (localStream) {
    //     localStream.getTracks().forEach(track => track.stop());
    //   }

    //   // Disconnect from the signaling server
      

    //   console.log('Call ended');
    // };
    // }, []);


  //   const callUser = async () => {
  //     const offer = await peerConnectionRef.current.createOffer();
  //     await peerConnectionRef.current.setLocalDescription(offer);
  //     socket.emit('offer', { sdp: peerConnectionRef.current.localDescription, roomId: '1234' });
  // };
  
  
   


 
  return (
    <>


    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Full-Screen Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <p>This is a full-screen modal. You can add any content here.</p>
            <Flex direction={"column"}>
          {stream&&  <video ref={myVideo} autoPlay muted style={{ maxWidth: "250px",borderRadius:'20px' }} />}
          {callAccepted&&!callEnded&&<video ref={userVideo} autoPlay style={{ width: "250px" }} />}  
           
            
          </Flex>
          <Button colorScheme="green" mr={3} onClick={callUser}>
            call
          </Button>
          <Button colorScheme="red" mr={3} onClick={leaveCall}>
            End
          </Button>
          {call.isReceivingCall&&<Button colorScheme="blue" mr={3} onClick={answerCall}>
            ans
          </Button>}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
  
}

export default VideoCall