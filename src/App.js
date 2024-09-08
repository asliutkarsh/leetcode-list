import { ChakraProvider ,ColorModeScript} from '@chakra-ui/react'
import { Routes,Route,} from 'react-router-dom'
import History from './pages/History';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { FaqPage } from './pages/FaqPage';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


function App() {
  return (
   
      <ChakraProvider >
        <ColorModeScript initialColorMode="dark"/>
            <Routes>
              <Route path="/" element = {<Home/>} />
              <Route path="/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/history" element = { <ProtectedRoute><History/></ProtectedRoute>} />
              <Route path="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/login" element = {<LoginPage/>} />
              <Route path="/signup" element = {<SignupPage/>} />
                <Route path="/forgot-password" element = {<ForgotPasswordPage/>} />
                <Route path="/reset-password" element = {<ResetPasswordPage/>} />
              <Route path="/faq" element = {<FaqPage/>} />
            </Routes> 
      </ChakraProvider>
    
    

);
}

export default App;
