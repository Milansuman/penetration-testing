import React, { useState } from 'react'
import './Login.css'
import {InputAdornment,Link,FormControlLabel,Checkbox,Grid, Avatar,Typography, Paper, Box, TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useUser } from './UserContext';
const Login = () => {
  var navigate = useNavigate();
  var [iconState, setIcon] = useState(false)
  var [usr, setUsr] = useState({username : '', password : ''})
  var [helperText, setHelperText] = useState(false);
  var [error, setError] = useState(false);
  const { user, setUser } = useUser();
  const inputHandler = (data)=>{
    console.log(data);
    setUsr({...usr,[data.target.name]: data.target.value})
  }
  const loginButton = ()=>{
    axios.post('http://localhost:3004/login',usr).then((res)=>{
      if(res.data){
        setError(false)
        window.alert('Logged in!')
        setUser({ username: res.data.username , _id : res.data._id});
        console.log(user)
        navigate('/')
      }
      else{
        console.log("Error with res")
      }
    }
  ).catch((error)=>{
    setError(true)
    setHelperText('Wrong password or username')
    console.log(error)
  });
  }
  const returnIcon = ()=>{
    if(iconState){
      <VisibilityIcon/>
    }
    else{
      <VisibilityOffIcon/>
    }
  }
  const changeIcon =()=>{
    if(iconState){
      setIcon(false)
    }
    else{
      setIcon(true)
    }
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
                    <TextField fullWidth inputProps={{type:iconState ? "text" : "password"}}  variant='outlined' label='Password' 
                    onChange={inputHandler} error={error} helperText = {helperText} name ='password' InputProps={{
                      endAdornment:<InputAdornment position="end"><Button onClick={
                        ()=>{
                          changeIcon()
                        }
                      }>{iconState?(<VisibilityIcon/>):<VisibilityOffIcon/>}</Button></InputAdornment>,
                    }} value = {(usr.password)}/> <br />
                    <Typography style={{paddingTop:'5%', fontSize:'14px'}} align='left'>Don't have an account? <Link style={{textDecoration:'none'}} onClick={()=>{navigate('/signup')}}>sign up</Link></Typography><br />
                    <Button type='submit' fullWidth variant='contained' onClick={loginButton}>Login</Button>
                </Grid> 
            </Paper>
        </Box>
    </div>
  )
}

export default Login
