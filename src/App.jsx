import React, {useState, lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useThemeContext } from './components/context/colorModeContext';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
// import Home from './components/Home/Home'
// import Auth from './components/Auth/Auth';
// import Profile from './components/Profile/Profile';
// import PostDetails from './components/PostDetails/PostDetails';
import './App.css';
const Home = lazy(()=> import('./components/Home/Home'));
const Auth = lazy(()=> import('./components/Auth/Auth'));
const PostDetails = lazy(()=> import('./components/PostDetails/PostDetails'))
const Profile = lazy(()=> import('./components/Profile/Profile'));


const App = () => { 
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('profile'));
  const { theme } = useThemeContext();
  return (
    <BrowserRouter>
        <div className="App" >
          <Container maxWidth="xl" sx={{mb:5}}> 
            <Navbar setAuthenticated={setAuthenticated} />
            <Suspense fallback={
              <div style={{display: 'grid', placeItems: 'center', width: '100%', height: '100vh'}}>
                Loading...
              </div>}
            >
              <Routes>
                <Route path='/' element={<Navigate replace to="/posts" />} />
                <Route path='/auth' element={authenticated? <Navigate replace to="/posts" />: <Auth setAuthenticated={setAuthenticated} />} />
                <Route path='/posts' element={<Home />} />
                <Route path='/posts/search' element={<Home />} />
                <Route path='/posts/:id' element={<PostDetails /> } />
                <Route path='/profile' element={authenticated? <Profile />: <Navigate replace to="/auth" />} />
                <Route path='/profile/:id' element={authenticated? <Profile />: <Navigate replace to="/auth" />} />
              </Routes>
            </Suspense>
          </Container>
        </div> 
    </BrowserRouter>
  )
}

export default App