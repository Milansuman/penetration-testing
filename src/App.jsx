import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Add from './components/Add'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Category from './components/Category'
import { UserProvider } from './components/UserContext';
import Profile from './components/Profile'

function App() {
  return (
    <div>
    <UserProvider>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/profile' element={<Profile/>}/>

      </Routes>
      </UserProvider>
    </div>
  )
}

export default App
