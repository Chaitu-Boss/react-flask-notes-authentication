import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Contact from './components/Contact'
import ProtectedRoute from './pages/ProtectedRoute'
import Notes from './components/Notes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/notes' element={<ProtectedRoute><Notes/></ProtectedRoute>} />
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
