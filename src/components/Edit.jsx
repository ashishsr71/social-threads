import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Cards from './Cards';



function Edit({isOpen,onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered trapFocus>
    <ModalOverlay />
    <ModalContent height="80vh" width="50%" bg="rgba(0,0,0,0.7)">
      <ModalHeader>Half Screen Modal</ModalHeader>
      <ModalCloseButton onClick={onClose} />
      <ModalBody>
        {/* Your modal content here */}
      <Cards/>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default Edit