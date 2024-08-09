import {IconButton, AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import LoginIcon from '@mui/icons-material/Login';
import { useUser } from './UserContext';
import { useEffect, useState } from 'react';
const Navbar = () => {
  var[loginButton,setLoginButton] = useState('Login')
  var {user, setUser} = useUser();
  var navigate = useNavigate();

  const checkUser = ()=>{
    if(!user){
      setLoginButton('Login')
    }
    else{
      setLoginButton('Logout')
    }
  }
  useEffect(checkUser)
  return (
    <div>
        <Box sx={{flexGrow:1}}>
        <AppBar className = 'appbar'>
            <Toolbar>
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}} 
                    to={'/'}><Typography variant='h4'>Recipes</Typography>
                </Link>
                </Button>
                <Typography sx={{flexGrow:1}}/>
                {user ? (
                  user._id === '66af3c474dc01b4ebd4c6a28' && (
                    <Button variant='text'>
                      <Link style={{ textDecoration: 'none', color: 'white' }} to='/admin'>
                        Admin
                      </Link>
                    </Button>
                  )
                ) : null}
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}}  to={'/category'}>categories</Link>
                </Button>
                {user ?(
                  <Button onClick={()=>{navigate('/profile',{state:{val:user._id}})}} variant='text'>
                  <Link style={{textDecoration:'none', color:'white'}}  to={'/category'}>Profile</Link>
                  </Button>
                ):null}
                {user ?(
                  <Button variant='text'>
                  <Link style={{textDecoration:'none', color:'white'}}  to={'/add'}>Add</Link>
                  </Button>
                ):null}
                <IconButton onClick={()=>{
                  if(!user){
                    navigate('/login')
                  }
                  else{
                    setUser(null);
                    window.alert('Logged out!')
                    navigate('/')
                  }
                 }
                }color='white' aria-label={loginButton}>
                <LoginIcon />
                <Typography style={{color:'white'}}>&nbsp;{loginButton}</Typography>
                </IconButton>
                
            </Toolbar>
        </AppBar>
        </Box>
    </div>
  )
}

export default Navbar