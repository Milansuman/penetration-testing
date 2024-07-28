import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
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
                <Button variant='text'>
                <Link style={{textDecoration:'none', color:'white'}}  to={'/a'}>Admin</Link>
                </Button>
            </Toolbar>
        </AppBar>
        </Box>
    </div>
  )
}

export default Navbar