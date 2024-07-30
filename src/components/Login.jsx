import React, { useState } from 'react'
import './Login.css'
import {Link,FormControlLabel,Checkbox,Grid, Avatar,Typography, Paper, Box, TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  var navigate = useNavigate();
  var [usr, setUsr] = useState({username : '', password : ''})
  const inputHandler = (data)=>{
    console.log(data);
    setUsr({...usr,[data.target.name]: data.target.value})
  }
  const loginButton = ()=>{
    axios.post('http://localhost:3004/login',usr).then((res)=>{
      console.log(res)
      if(res.data){
        window.alert('Logged in!')
        navigate('/',{state:{val:res.data}})
      }
      else{
        console.log("Error with res")
      }
    }).catch((error)=>{console.log(error)});
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
                    onChange={inputHandler} name ='username' value = {(usr.username)}/>  <br /> <br />
                    <TextField fullWidth type='password' variant='outlined' label='Password' 
                    onChange={inputHandler} name ='password' value = {(usr.password)}/> <br />
                    <Typography style={{paddingTop:'5%', fontSize:'14px'}} align='left'>Don't have an account? <Link style={{textDecoration:'none'}} onClick={()=>{navigate('/signup')}}>sign up</Link></Typography><br />
                    <Button type='submit' fullWidth variant='contained' onClick={loginButton}>Login</Button>
                </Grid> 
            </Paper>
        </Box>
    </div>
  )
}

export default Login
