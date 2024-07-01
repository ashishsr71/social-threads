import React from 'react'
import { Outlet } from 'react-router-dom'
import { Flex,Button ,useColorModeValue} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Slices/Auith';

// component starts here
function Navbar() {
  const dispatch= useDispatch();
  const user=useSelector(state=>state.auth);
  const footerBgColor = useColorModeValue('light.footerBg', 'dark.footerBg');

  return (
    <>
     <button onClick={()=>{dispatch(logout())}}>logout</button>
{<Outlet/>}
{user.token&&

     <Flex justify="center" align="center" bg={footerBgColor} p={4} position="sticky" bottom={0} zIndex={10}>
       <Link to='/'>   <Button variant="outline" mx={2}>Home</Button></Link>
       <Link to='/createpost'> <Button variant="outline" mx={2}>Post</Button></Link>
        <Button variant="outline" mx={2}>Notifications</Button>
        <Button variant="outline" mx={2}>Messages</Button>
      <Link to='/profile' > <Button variant="outline" mx={2}>Profile</Button></Link>
      </Flex>}
   
    </>
  )
}

export default Navbar;