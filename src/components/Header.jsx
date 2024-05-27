import { Flex,useColorMode } from '@chakra-ui/react'
import React from 'react'

function Header() {
      const {colorMode,toggleColorMode}=useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
      <span onClick={toggleColorMode}>mode</span>
    </Flex>
  )
}

export default Header;