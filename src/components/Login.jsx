import React, { useState } from 'react'
import './Login.css'
import {Link,FormControlLabel,Checkbox,Grid, Avatar,Typography, Paper, Box, TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  var navigate = useNavigate();
  var [usr, setUsr] = useState({usrname : '', passwrd : ''})
  const inputHandler = (data)=>{
    console.log(data);
    setUsr({...usr,[data.target.name]: data.target.value})
  }
  return (
    <div style={{padding:'20%'}}>
        <Box justifyContent={'center'}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 356,
                  height: 412,
                },
              }}
        >
            <Paper elevation={3}>
                <Grid style={{padding:'10%'}} align={'center'}>
                    <Avatar style={{backgroundColor:'gray'}}> <AccountCircleIcon/></Avatar>
                    <Typography variant='h4'>Login</Typography> <br /> <br />
                    <TextField fullWidth variant='outlined' label='Username' 
                    onChange={inputHandler} name ='usrname' value = {(usr.usrname)}/>  <br /> <br />
                    <TextField fullWidth type='password' variant='outlined' label='Password' 
                    onChange={inputHandler} name ='passwrd' value = {(usr.passwrd)}/> <br />
                    <Typography style={{paddingTop:'5%', fontSize:'14px'}} align='left'>Don't have an account? <Link style={{textDecoration:'none'}} onClick={()=>{navigate('/signup')}}>sign up</Link></Typography><br />
                    <Button type='submit' fullWidth variant='contained' onClick={()=>{console.log(usr.usrname);console.log(usr.passwrd);}}>Login</Button>
                </Grid> 
            </Paper>
        </Box>
    </div>
  )
}

export default Login
