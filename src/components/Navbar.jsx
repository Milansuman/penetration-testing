import {IconButton, AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import LoginIcon from '@mui/icons-material/Login';
const Navbar = () => {
  var navigate = useNavigate();
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
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}}  to={'/add'}>Add</Link>
                </Button>
                <IconButton onClick={()=>{navigate('/login')}}color='white' aria-label="Login">
                  <LoginIcon/>
                </IconButton>
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}}  to={'/a'}>Admin</Link>
                </Button>
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}}  to={'/c'}>categories</Link>
                </Button>
            </Toolbar>
        </AppBar>
        </Box>
    </div>
  )
}

export default Navbar