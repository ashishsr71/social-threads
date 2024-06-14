import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as RouterLink ,Navigate, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { signupThunk } from '../Slices/Auith';
import { useDispatch, useSelector } from 'react-redux';





// component starts here
function Signup() {
  const [showPassword, setShowPassword] = useState(false)
const dispatch= useDispatch();
const navigate=useNavigate()
const user= useSelector(state=>state.auth);

useEffect(()=>{
if(user.userId && user.token !==''){
  navigate('/')
}
},[user]);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  function onSubmit(data){
  const obj={...data,username:data.firstName};
  dispatch(signupThunk(obj));
  };

  

  return (
    
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} >
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
          
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl  >
                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                <Input  {...register("firstName",{required:true,pattern:{message:'enter user name'}})} />
                {errors.firstName && <p style={{color:'red'}}>enter user name</p>}
              </FormControl>
             
            </Box>
            <Box>
            
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input {...register("lastName",{required:true,pattern:{message:'last name'}})}/>
                {errors.email && (
          <p role="alert" style={{color:'red'}}>invalid email</p>
        )}
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" >
            <FormLabel>Email address</FormLabel>
            <Input  {...register("email", { required: true,    pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          }, })}/>
               {errors.email && (
          <p role="alert" style={{color:'red'}}>invalid email</p>
        )}
          </FormControl>
          <FormControl id="password" >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'}  {...register("password",{required:true,pattern:{message:' enter password'}})} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
          <p role="alert" style={{color:'red'}}>enter passowrd</p>
        )}
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
            type='submit'
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign up
            </Button>
           
          </Stack>
         
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user? <RouterLink to={'/login'}><Link color={'blue.400'}>Login</Link></RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Box> </form>
    </Stack>
  </Flex>
  )
}

export default Signup;