import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex,Button ,useColorModeValue,Box,  Input, InputGroup, InputLeftElement, IconButton,useBreakpointValue } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Slices/Auith';
// import { BellIcon, EmailIcon } from '@chakra-ui/icons';
// import Search from '../components/Search';
import { FaUser,FaBell, FaFeatherAlt  } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import {RiSendPlaneLine, RiSearchLine } from 'react-icons/ri';
import { HamburgerIcon } from '@chakra-ui/icons';
// component starts here
function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isMenuOpen,setMenuOpen]=useState(false);
  // const dispatch= useDispatch();
  const user=useSelector(state=>state.auth);
  const footerBgColor = useColorModeValue('light.footerBg', 'dark.footerBg');




  const toggleMenu = () => {
    // console.log('iam working')
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
    
  
     {/* <button onClick={()=>{dispatch(logout())}}>logout</button> */}
{<Outlet/>}

{isMobile&&<HamburgerIcon onClick={toggleMenu}/>}
{isMobile&&isMenuOpen&&user.userId&&<Flex  justify="center"
     align="center"
     bg={footerBgColor}
     p={4}
     position="fixed"
     bottom={0}
     left={0}
     width="100%"
     zIndex={10}
     borderTop="1px solid"
     borderColor="gray.200">
       <Link to='/'>  <IconButton bg={'black'} 
       color={'white'}
          aria-label="Messages"
          icon={<AiOutlineHome/>}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        /></Link>
       <Link to='/createpost'>  <IconButton bg={'black'}
         color={'white'}
          aria-label="Messages"
          icon={<FaFeatherAlt />}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        /></Link>
       <IconButton bg={'black'}
         color={'white'}
          aria-label="Messages"
          icon={<FaBell/>}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        />
        {/* this is message icon */}
        <Link to='/messages'>
        <IconButton bg={'black'}
          color={'white'}
          aria-label="Messages"
          icon={<RiSendPlaneLine/>}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        /></Link>
      {/* this is searchicon */}
      <Link to='/search/users'>
      <IconButton bg={'black'}
        color={'white'}
          aria-label="Messages"
          icon={< RiSearchLine/>}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        /> </Link>
      
      <Link to='/profile' > <IconButton bg={'black'}
        color={'white'}
        
          aria-label="Messages"
          icon={<FaUser />}
          size="lg"
          variant="outline"
          onClick={toggleMenu}
        /></Link>
      </Flex>}
{user.token&& user.userId&&!isMobile&&

     <Flex  justify="center"
     align="center"
     bg={footerBgColor}
     p={4}
     position="fixed"
     bottom={0}
     left={0}
     width="100%"
     zIndex={10}
     borderTop="1px solid"
     borderColor="gray.200">
       <Link to='/'>  <IconButton bg={'black'} 
       color={'white'}
          aria-label="Messages"
          icon={<AiOutlineHome/>}
          size="lg"
          variant="outline"
        /></Link>
       <Link to='/createpost'>  <IconButton bg={'black'}
         color={'white'}
          aria-label="Messages"
          icon={<FaFeatherAlt />}
          size="lg"
          variant="outline"
        /></Link>
       <IconButton bg={'black'}
         color={'white'}
          aria-label="Messages"
          icon={<FaBell/>}
          size="lg"
          variant="outline"
        />
        {/* this is message icon */}
        <Link to='/messages'>
        <IconButton bg={'black'}
          color={'white'}
          aria-label="Messages"
          icon={<RiSendPlaneLine/>}
          size="lg"
          variant="outline"
        /></Link>
      {/* this is searchicon */}
      <Link to='/search/users'>
      <IconButton bg={'black'}
        color={'white'}
          aria-label="Messages"
          icon={< RiSearchLine/>}
          size="lg"
          variant="outline"
        /> </Link>
      
      <Link to='/profile' > <IconButton bg={'black'}
        color={'white'}
        
          aria-label="Messages"
          icon={<FaUser />}
          size="lg"
          variant="outline"
        /></Link>
      </Flex>}
   
    </>
  )
}

export default Navbar;
