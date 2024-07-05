import React, { useEffect, useState } from 'react'
import { Flex,Box,  Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchModal from './SearchModal';
import axios from 'axios';

// component starts here
function Search() {
    const [value,setValue]=useState("");
    const [result,setResult]=useState(null);
    const [error,setError]=useState(null);
    // this useeffect will debounce
    useEffect(()=>{
      if(value.length===0)return;
     const getData=setTimeout(() => {
      console.log("hii form fimeout")
      axios.get(`${import.meta.env.VITE_API}/search?username=${value}`).then(res=>{
        setResult(res.data);
      }).catch(err=>{setError(err)});
     }, 1000);
     return ()=>clearTimeout(getData);
    },[value]);

  return (
    <>
    <Box>
    <Flex>
    <InputGroup>
       <InputLeftElement pointerEvents="none">
         <SearchIcon color="gray.300" />
       </InputLeftElement>
       <Input type="text" placeholder="Search..." value={value} onChange={(e)=>{setValue(e.target.value)}}/>
      { value.length&&<InputRightElement  cursor={'pointer'} onClick={()=>{setValue('')}}>x</InputRightElement>}
     </InputGroup>

    </Flex>

   </Box>
   {value.length&& <SearchModal/>}
   </>
  )
}

export default Search;