import React from 'react'
import { ChakraProvider, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,Box } from '@chakra-ui/react';




function SearchModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();


  return (
   <>
           {/* <Button onClick={onOpen}>Open Modal</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent bg="black" color="white">
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      This is the modal content.
    </ModalBody>

    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant="ghost" color="white">Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal> */}


<Box mt={2} border="1px solid" borderColor="gray.300" borderRadius="md" p={2} bg="white" zIndex={2}>
    <h2>sdfsfsds</h2>
    <h2>sdfsfsds</h2> <h2>sdfsfsds</h2><h2>sdfsfsds</h2><h2>sdfsfsds</h2><h2>sdfsfsds</h2><h2>sdfsfsds</h2><h2>sdfsfsds</h2><h2>sdfsfsds</h2>
    </Box>
   </>
  )
};

export default SearchModal;