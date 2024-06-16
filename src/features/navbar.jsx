import React from 'react'
import { Outlet } from 'react-router-dom'
import { Flex,Button ,useColorModeValue} from '@chakra-ui/react'


// component starts here
function Navbar() {
  const footerBgColor = useColorModeValue('light.footerBg', 'dark.footerBg');

  return (
    <>
    <Flex height="100vh" direction="column">
{<Outlet/>}
     <Flex justify="center" align="center" bg={footerBgColor} p={4} position="sticky" bottom={0} zIndex={10}>
        <Button variant="outline" mx={2}>Home</Button>
        <Button variant="outline" mx={2}>Explore</Button>
        <Button variant="outline" mx={2}>Notifications</Button>
        <Button variant="outline" mx={2}>Messages</Button>
        <Button variant="outline" mx={2}>Profile</Button>
      </Flex></Flex>
    </>
  )
}

export default Navbar;