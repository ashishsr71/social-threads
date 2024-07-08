
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Feed from './pages/Feed'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './features/navbar'
import { Container } from '@chakra-ui/react'
import Userpage from './pages/userpage'
import Postpage from './pages/Postpage'
import Header from './components/Header'
import Upload from './pages/Upload'
import Auth from './components/Auth';
import CreatePost from './components/createPost';
import Skeletons from './components/Skeleton';
import LoggedUser from './components/LoggedUser';
import Search from './components/Search'
import Profile from './pages/Profile'


// component starts here
function App() {
 const router= createBrowserRouter((createRoutesFromElements(
  <Route path='/' element={<Navbar/>}>
  <Route index element={<Auth><Feed/></Auth>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/profile' element={<Auth><Profile/></Auth>}/>
  <Route path='/user/:userid' element={<Auth><Userpage/></Auth>}/>
  <Route path='/post/:id' element={<Postpage/>}/>
  <Route path='/upload' element={<Upload/>}/>
  <Route path="/loading" element={<Skeletons/>} />
  <Route path ='/search/users' element={<Search/>}/>
  <Route path='/createpost' element={<Auth><CreatePost/></Auth>} />
 </Route>)))

  return (
<Container maxW='620px'>
  <Header/>
   <RouterProvider router={router}/>
   </Container>
  )
}

export default App;
