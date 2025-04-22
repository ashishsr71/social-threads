import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Flex,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logOutFrom } from '../Slices/Auith';

import { FaUser, FaFeatherAlt, FaUsers, FaCog } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { RiSendPlaneLine, RiSearchLine } from 'react-icons/ri';
import { HamburgerIcon } from '@chakra-ui/icons';

function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('whiteAlpha.600', 'whiteAlpha.300');

  const handleLogout = () => {
    dispatch(logOutFrom());
    onClose();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: '/', icon: <AiOutlineHome /> },
    { to: '/createpost', icon: <FaFeatherAlt /> },
    { to: '/live/createRoom', icon: <FaUsers /> },
    { to: '/messages', icon: <RiSendPlaneLine /> },
    { to: '/search/users', icon: <RiSearchLine /> },
    { to: '/profile', icon: <FaUser /> },
    { action: onOpen, icon: <FaCog /> },
  ];

  const navbarStyle = {
    justify: 'space-around',
    align: 'center',
    bg: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '2xl',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    px: 6,
    py: 3,
    width: 'fit-content',
    zIndex: 20,
    border: 'none',
  };

  return (
    <>
   
      <Flex
        justify="space-between"
        align="center"
        p={3}
        px={6}
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        position="sticky"
        top={0}
        zIndex={30}
        bg={"transparent"}
        boxShadow="sm"
      >
    <Box display={{ base: 'block', md: 'none' }}>
  <Box
    onClick={toggleMenu}
    position="relative"
    w="60px"
    h="60px"
    borderRadius="full"
    cursor="pointer"
    bg="transparent"
    display="flex"
    alignItems="center"
    justifyContent="center"
    _hover={{ transform: "scale(1.05)" }}
    transition="0.3s ease"
  >
    
    <Box
      position="absolute"
      w="100%"
      h="100%"
      borderRadius="full"
      bg="conic-gradient(from 180deg at 50% 50%, #00f0ff, #7a00ff, #ff00c8, #00f0ff)"
      filter="blur(4px)"
      animation="spin 4s linear infinite"
    />

 
    <Box
      zIndex={1}
      w="42px"
      h="42px"
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
    >
      <HamburgerIcon color="blue.500" boxSize={6} />
    </Box>
  </Box>
</Box>


        {/* <Text fontWeight="bold" fontSize="lg">
       
        </Text> */}

      
      </Flex>

      
      <Box
  pb={{
    base: '0px',
    md: '120px',
  }}
>
  <Outlet />
</Box>
     
      {isMobile && isMenuOpen && user.userId && (
        <Flex {...navbarStyle}>
          {navLinks.map((item, index) =>
            item.to ? (
              <Link key={index} to={item.to} onClick={toggleMenu}>
                <IconButton
                  aria-label={`Nav ${index}`}
                  icon={item.icon}
                  bg="transparent"
                  color={iconColor}
                  _hover={{ bg: hoverBg }}
                  size="lg"
                  variant="ghost"
                  m={1}
                />
              </Link>
            ) : (
              <IconButton
                key={index}
                aria-label={`Nav ${index}`}
                icon={item.icon}
                onClick={() => {
                  toggleMenu();
                  item.action();
                }}
                bg="transparent"
                color={iconColor}
                _hover={{ bg: hoverBg }}
                size="lg"
                variant="ghost"
                m={1}
              />
            )
          )}
        </Flex>
      )}

     
      {!isMobile && user.token && user.userId && (
        <Flex {...navbarStyle}>
          {navLinks.map((item, index) =>
            item.to ? (
              <Link key={index} to={item.to}>
                <IconButton
                  aria-label={`Nav ${index}`}
                  icon={item.icon}
                  bg="transparent"
                  color={iconColor}
                  _hover={{ bg: hoverBg }}
                  size="lg"
                  variant="ghost"
                  m={1}
                />
              </Link>
            ) : (
              <IconButton
                key={index}
                aria-label={`Nav ${index}`}
                icon={item.icon}
                onClick={item.action}
                bg="transparent"
                color={iconColor}
                _hover={{ bg: hoverBg }}
                size="lg"
                variant="ghost"
                m={1}
              />
            )
          )}
        </Flex>
      )}

     
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="red"
              onClick={handleLogout}
              w="full"
              mt={4}
              variant="solid"
            >
              Logout
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;
