import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Add from './components/Add'
import Admin from './components/Admin'
import Category from './components/Category'

function App() {
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/a' element={<Admin/>}/>
        <Route path='/c' element={<Category/>}/>


      </Routes>
    </div>
  )
}

export default App
