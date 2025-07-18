
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

import Chat from './pages/Chat';
import AudioConference from './components/AudioConference';
import ConferenceUi from './components/ConferenceUi';
import ConferencePage from './pages/ConferencePage';
import ForgotPassword from './pages/ForgotPassword';
;

// component starts here
function App() {
 const router= createBrowserRouter((createRoutesFromElements(
  <Route path='/' element={<Navbar/>}>
  <Route index element={<Auth><Feed/></Auth>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/profile' element={<Auth><Profile/></Auth>}/>
  <Route path='/user/:userid' element={<Auth><Userpage/></Auth>}/>
  <Route path='/post/:id' element={<Auth><Postpage/></Auth>}/>
  <Route path='/upload' element={<Auth><Upload/></Auth>}/>
  <Route path="/loading" element={<Skeletons/>} />
  <Route path ='/search/users' element={<Auth><Search/></Auth>}/>
  <Route path='/createpost' element={<Auth><CreatePost/></Auth>} />
  <Route path ='/messages' element={<Auth> <Chat/></Auth>}/>
  <Route path ='/live/:roomId' element={<Auth><AudioConference/></Auth>}/>
  <Route path='/conf' element={<ConferenceUi/>}/>
  <Route path='/confern' element={<ConferencePage/>}/>
  <Route path="/forgot-password" element={<ForgotPassword/>}/>
 </Route>)))  

  return (
<Container maxW='620px'>
  <Header/>

   <RouterProvider router={router}/>
  
   </Container>
  )
}

export default App;
