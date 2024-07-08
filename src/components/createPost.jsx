import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Input, Text, Button, Textarea,useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk } from '../Slices/postSlice';
import { redirect, useNavigate } from 'react-router-dom';


// component starts here
function CreatePost() {
    const token=useSelector(state=>state.auth.token);
    const footerBgColor = useColorModeValue('light.footerBg', 'dark.footerBg');
    const [text,setText]=useState('');
    const [image,setImage]=useState(null);
    const [video,setVideo] =useState(null);
   const [error,setError]=useState(null);
   const[media,setMedia]=useState({});
   const dispatch= useDispatch();
const [loading,setLoading]=useState(false);
const postState=useSelector(state=>state.post);
// const navigate= useNavigate()




// above all hooks
useEffect(()=>{
try {
    async function uplod(){
        let signature='';
        let timestamp=0; 
        if(image || video){
           
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
    setError(error);
}
},[video,image]);

// useeffect to redirect to homepage
useEffect(()=>{
  if(!postState.error){}
 

},[postState.error]);




function handleChange(e){
    setImage(e.target.files[0]);
    setLoading(true)
console.log(e.target.files[0])
};
// this funciton will handle videos
function handleVideo(e){
  setLoading(true)
setVideo(e.target.files[0]);
}
// this will handle text for post
function handleText(e){
    console.log(e.target.value);
setText(e.target.value);
};

// this will handle post
function handlePost(){
  const data= {media,text};
  console.log(data);
dispatch(createPostThunk({data,token}));

}
// if the state is loading or 
if(loading||error){
  if(error){return <h2>something went wrong</h2>}
  return <h2>...loading</h2>
}  



  return (
    <Flex height="100vh" direction="column">
      {/* Main Content */}
      <Flex direction="column" flex={1} p={4}>
        {/* Header */}
        
        {/* Compose Tweet Box */}
        <Box mb={4}>
          <Textarea placeholder="What's happening?" size="sm" resize="none" onChange={handleText} />
          <Flex align="center" mt={2}>
            <Input type="file" accept="image/*" display="none" id="image-upload" onChange={handleChange} />
            <label htmlFor="image-upload">
              <Button as="span" colorScheme="blue" mr={2}>
                Upload Image
              </Button>
            </label>
            <Input type="file" accept="video/*" display="none" id="video" onChange={handleVideo} />
            <label htmlFor="video">
              <Button as="span" colorScheme="blue" mr={2}>
                Upload Video
              </Button>
            </label>
          
          </Flex>
          {image && (
           
           <img src={URL.createObjectURL(image)} style={{height:"200px"}}/>
        
       )}
          <Button colorScheme="blue" mt={2} onClick={handlePost}>Post</Button>
        </Box>

        {/* Tweet Feed (example) */}
       

        {/* Additional tweets would be mapped here */}
      </Flex>

      {/* Footer */}
      {/* <Flex justify="center" align="center" bg={footerBgColor} p={4} position="sticky" bottom={0} zIndex={10}>
        <Button variant="outline" mx={2}>Home</Button>
        <Button variant="outline" mx={2}>Explore</Button>
        <Button variant="outline" mx={2}>Notifications</Button>
        <Button variant="outline" mx={2}>Messages</Button>
        <Button variant="outline" mx={2}>Profile</Button>
      </Flex> */}
    </Flex>
  )
}

export default CreatePost;