import React from 'react'
import { ChakraProvider, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';




function SearchModal({users}) {
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
    {users.length && users.map((user)=>{
      return <><Link to={`/user/${user._id}`}><h2 style={{color:'black'}} >{user.username}</h2></Link></>
    })}
    
    </Box>
   </>
  )
};

export default SearchModal;