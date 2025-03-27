import { Flex, Input,Button, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast';
// Text
function ForgotPassword() {
    const [input,setInput]=useState("");
    const showToast=useShowToast();
    useEffect(()=>{
        
    },[])
    const onSub=async()=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_API}/user/forgot-password`,{email:input});   
            showToast("Success",response.data.message)
        } catch (error) {
            showToast("Error","something went wrong");
        };
   
    
    };
  return (
   <Flex p={5} mt={2} mx={"auto"} direction="column">
    <Text mb={5} align="center">Reset password</Text>
    <form action="" onSubmit={onSub}>
    <Input type='email' placeholder='enter your email adderess' required={true} value={input} onChange={(e)=>{
        setInput(e.target.value);
    }}/>
    <Button mt={5} width={20} color="white" background="blue" type='submit'>Send link</Button>
    </form>
   </Flex>
  )
};

export default ForgotPassword;