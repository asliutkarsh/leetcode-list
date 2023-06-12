import { ChakraProvider ,ColorModeScript} from '@chakra-ui/react'
import { Routes,Route,} from 'react-router-dom'
import UserProvider from './context/UserProvider';
import History from './pages/History';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { FaqPage } from './pages/FaqPage';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
   
      <ChakraProvider >
        <ColorModeScript initialColorMode="dark"/>
            <Routes>
              <Route path="/" element = {<Home/>} />
              <Route path="/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/history" element = { <ProtectedRoute><History/></ProtectedRoute>} />
              <Route path="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/login" element = {<Login/>} />
              <Route path="/signup" element = {<Signup/>} />
              <Route path="/faq" element = {<FaqPage/>} />
            </Routes> 
      </ChakraProvider>
    
    

);
}

export default App;
