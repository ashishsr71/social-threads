import React, { useRef } from 'react'
import {
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";

// component starts here
function MsgInput() {
    const { onClose } = useDisclosure();
    const handleSendMessage=()=>{}
    const messageText='asdfsf'
    const imageRef=useRef();
    const handleImageChange=()=>{};
    const imgUrl=''
    const isSending=true
  return(
    <Flex gap={2} alignItems={"center"}>
        <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
            <InputGroup>
                <Input
                    w={"full"}
                    placeholder='Type a message'
                    onChange={(e) => setMessageText(e.target.value)}
                    value={messageText}
                />
                <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </form>
        <Flex flex={5} cursor={"pointer"}>
            <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
            <Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />
        </Flex>
        <Modal
            isOpen={imgUrl}
            onClose={() => {
                onClose();
               
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex mt={5} w={"full"}>
                        <Image src={imgUrl} />
                    </Flex>
                    <Flex justifyContent={"flex-end"} my={2}>
                        {!isSending ? (
                            <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
                        ) : (
                            <Spinner size={"md"} />
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    </Flex>
);
}

export default MsgInput