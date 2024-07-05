import React, { useEffect, useRef, useState } from 'react'
import { Flex,Box,  Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchModal from './SearchModal';
import axios from 'axios';

// component starts here
function Search() {
    const [value,setValue]=useState("");
    const [result,setResult]=useState([]);
    const [error,setError]=useState(null);
    const [isEmpty,setIsEmpty]=useState(false);


    const searchRef=useRef(null);
    // this useeffect will debounce
    useEffect(()=>{
      if(result.length)return;
     setTimeout(() => {
      setIsEmpty(false);
     }, 3000);
    },[result])
      // this useeffect will debounce
    useEffect(()=>{
      if(value.length===0)return;
     const getData=setTimeout(() => {
      console.log("hii form fimeout")
      axios.get(`${import.meta.env.VITE_API}/search?username=${value}`).then(res=>{
      //  console.log(res.data.length)
       if(res.data.length<1){
         setIsEmpty(true)
       }
        setResult([...res.data]);
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
       <Input type="text" placeholder="Search..." ref={searchRef} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
      { value.length&&<InputRightElement  cursor={'pointer'} onClick={()=>{
        searchRef.current.focus();
        setValue('')}}>x</InputRightElement>}
     </InputGroup>

    </Flex>

   </Box>
   {value&&result.length&& <SearchModal users={result}/>}
   {isEmpty &&<Box mt={2} border="1px solid" borderColor="gray.300" borderRadius="md" p={2} bg="white" zIndex={2}>
      <h2 style={{color:'black'}}>no Results found</h2>
   </Box>}
   </>
  )
}

export default Search;