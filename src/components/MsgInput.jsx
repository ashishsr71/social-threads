import React, { useEffect, useRef, useState } from 'react'
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
import axios from 'axios';
import { useSelector } from 'react-redux';

// component starts here
function MsgInput({reciepentId,setMessages}) {
    const inputRef=useRef();
    const [text,setText]=useState('')
    const {token,userId}=useSelector(state=>state.auth);
    // useEffect(()=>{
    //  if(text.length<1)return;
    // axios.post(`${import.meta.env.VITE_API}/user/sendmessage`,{text,reciepentId},{headers:{token}}).then(res=>{
    //     // console.log(res.data);
    // })
    // },[text]);



    const { onClose } = useDisclosure();
    const handleSendMessage=async(e)=>{
        e.preventDefault();
     const {data}= await axios.post(`${import.meta.env.VITE_API}/user/sendmessage`,{text,reciepentId},{headers:{token}});
    //  console.log(data)
     setMessages(prev=>[...prev,data]);
     setText('');
        };
    // const messageText='asdfsf'
    const imageRef=useRef();
    const handleImageChange=()=>{};
    const imgUrl=''
    const isSending=true
   
// this is to send message


    
  return(
    <Flex gap={2} alignItems={"center"}>
        <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
            <InputGroup>
                <Input
                    w={"full"}
                    placeholder='Type a message'
                    onChange={(e)=>{setText(e.target.value)}}
                    value={text}
                   
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

export default MsgInput;