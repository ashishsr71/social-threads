import React, { useEffect, useRef, useState } from 'react';
import {useBreakpointValue} from '@chakra-ui/react'
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
function VideoCall({isOpen,onClose,socket}) {
    
    const endCallButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const [localStream, setLocalStream] = useState(null);
      const [remoteStream, setRemoteStream] = useState(null);
      const localVideoRef = useRef();
      const remoteVideoRef = useRef();
      const peerConnectionRef = useRef();
    const iceServers = {
      iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }, 
         
      ]
  };
  
 
  // const peerConnection = new RTCPeerConnection(iceServers);

    useEffect(() => {
     
      async function init() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(iceServers);
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        peerConnectionRef.current = pc;

        pc.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('ice-candidate', { candidate: event.candidate, roomId: '1234' });
            }
        };

        pc.ontrack = event => {
            setRemoteStream(event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };
    }

    socket.emit('join-room', '1234');

    socket.on('offer', async (sdp) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit('answer', { sdp: peerConnectionRef.current.localDescription, roomId: '1234' });
    });

    socket.on('answer', async (sdp) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on('ice-candidate', async (candidate) => {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
    init();
    
    return () => {
      // Cleanup function to be called on component unmount

      // Close all peer connections
      Object.values(peerConnections.current).forEach(pc => pc.close());

      // Stop all local media tracks
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      // Disconnect from the signaling server
      

      console.log('Call ended');
    };
    }, []);


    const callUser = async () => {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit('offer', { sdp: peerConnectionRef.current.localDescription, roomId: '1234' });
  };
  
  
   


 
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
            <div>
            <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
            <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
           
            <Button colorScheme="green" mr={3} onClick={callUser}>
            call
          </Button>
        </div>
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