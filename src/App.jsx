import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Add from './components/Add'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Category from './components/Category'

function App() {
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/a' element={<Admin/>}/>
        <Route path='/c' element={<Category/>}/>


      </Routes>
    </div>
  )
}

export default App
