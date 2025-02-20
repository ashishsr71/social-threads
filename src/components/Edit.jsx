import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import AddStory from './AddStory';


function Edit({isOpen,onClose}) {
  const modalSize = useBreakpointValue({ base: "xs", sm: "sm", md: "md", lg: "lg" });
  const modalWidth = useBreakpointValue({ base: "90%", sm: "75%", md: "60%", lg: "50%" });
  const modalHeight = useBreakpointValue({ base: "70vh", sm: "75vh", md: "80vh" });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered trapFocus>
      <ModalOverlay />
      <ModalContent height={modalHeight} width={modalWidth} bg="rgba(0,0,0,0.7)">
        <ModalHeader>Upload Story</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          {/* Your modal content here */}
          {/* <Cards/> */}
          <AddStory />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit