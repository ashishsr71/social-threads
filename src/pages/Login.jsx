import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
 import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom'
 import { useForm } from "react-hook-form"
import { color } from 'framer-motion';
import { loginThunk } from '../Slices/Auith';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Skeletons from '../components/Skeleton';

// component starts here
function Login() {
const dispatch=useDispatch();
const navigate=useNavigate();
const user=useSelector(state=>state.auth);
// console.log(user.error)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  

  useEffect(()=>{
    // console.log(user)
    if(user.userId){
      console.log("i am working")
      navigate('/')
    }
    },[user])

const onSubmit=(data)=>{
// console.log(data.email)
// console.log(data.password)
dispatch(loginThunk(data));
};




  return (
   <>
   {/* {user.userId&&<Navigate to='/'/>} */}
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
         
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl  >
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input  {...register("email", { required: true,    pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          }, })} />
                {errors.email && (
          <p role="alert" style={{color:'red'}}>invalid email</p>
        )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"  {...register("password",{required:true,pattern:{message:'enter password'},},)}/>
              {errors.password && (
        <p role="alert" style={{color:'red'}}>enter password</p>
      )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
             {!user.pending &&<Button
              type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>}
            {user.pending&& <Skeletons/>}
            </Stack>
            <Stack pt={6}>
            <Text align={'center'}>
              New user? <RouterLink to={'/signup'}><Link color={'blue.400'}>Signup</Link></RouterLink>
              {user.error.length>0 &&<h2 style={{color:"red"}}>{user.error}</h2>}
            </Text>
          </Stack>
          </Stack>  </form>
        </Box>
      </Stack>
    </Flex></>)
}

export default Login;