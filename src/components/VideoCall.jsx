import {useRef} from 'react'
import { Box,Button ,useBreakpointValue} from '@chakra-ui/react'
function VideoCall() {
    const remoteVideoRef = useRef(null);
    const endCallButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const handleCall=()=>{}
  return (
    <Box
    position="fixed"
    top="0"
    left="0"
    w={"full"}
    h={"full"}
    bg="teal.500"
    color={"black"}
  >
    <Box
      as="video"
      ref={remoteVideoRef}
      
      autoPlay
      playsInline
      objectFit="cover"
    />
    <Button
      position="absolute"
      bottom="20px"
      left="20px"
      colorScheme="red"
      size={endCallButtonSize}
     
    >
      End Call
    </Button>
  </Box>
  )
}

export default VideoCall