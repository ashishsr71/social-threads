import React, { useState,useEffect } from 'react'
 import { ModalBody,Modal,ModalContent,ModalHeader,ModalCloseButton,ModalOverlay, Avatar, Input, Box, Button, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import axios from 'axios';





 function AddProfile({isOpen,onClose,userImg,setImg}) {
    const {token}=useSelector(state=>state.auth);
    
  const [image,setImage]=useState(null);
  const [error,setError]=useState(null);
   const[media,setMedia]=useState({});
   const [loading,setLoading]=useState(false);
    useEffect(()=>{
        try {
            async function uplod(){
                let signature='';
                let timestamp=0; 
                if(image){
                   
                  await  axios.get(`${import.meta.env.VITE_API}/getsignature`,{headers:{token:token}}).then(res=>{
                       signature=res.data.signature;
                       timestamp=res.data.timestamp;
                    }).catch(err=>setError(err))
              
                const data=new FormData();
                data.append("file",image||video)
                data.append("timestamp", timestamp)
                data.append("signature",signature)
                data.append("api_key",171627853614734)
               
            
            const {data:response} =   await axios.post("https://api.cloudinary.com/v1_1/dizyncuqs/image/upload",data);
                console.log(response)
                setMedia(response);
                setLoading(false);
            //  const responses=await axios.post('http://localhost:4000/user/createpost',{media:response,text:text},{headers:{token:token}});
            //  console.log(responses)
            };
                  
                
                
            };
            uplod();
        } catch (error) {
            setError("something went wrong");
        }
        },[image]);

        useEffect(()=>{
         if(!media)return;
        //  console.log(media.secure_url)
         axios.post(`${import.meta.env.VITE_API}/user/profilepic`,{url:media.secure_url},{headers:{token:token}}).then(res=>setImg(res?.data?.url))

        },[media]);
    const handleprofileImage=(e)=>{   setImage(e.target.files[0]);
        setLoading(true)};
        // console.log(userImg)
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
       <ModalOverlay />
       <ModalContent>
         <ModalHeader>Profile</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
         <Flex  padding={3} alignItems={'center'} >
          <Avatar size={'xl'} src={userImg}/>
      
          <Input type='file'   accept="image/*" padding={1} onChange={handleprofileImage} />
          <Button >Update</Button>
          </Flex>
         </ModalBody>
       </ModalContent>
     </Modal>
     </>
  )
}

export default AddProfile