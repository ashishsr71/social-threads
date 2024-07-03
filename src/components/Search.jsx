import React, { useState } from 'react'
import { Flex,Box,  Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchModal from './SearchModal';


// component starts here
function Search() {
    const [value,setValue]=useState("");

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