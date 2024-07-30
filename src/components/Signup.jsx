import React from 'react'
import './Login.css'
import {Link,FormControlLabel,Checkbox,Grid, Avatar,Typography, Paper, Box, TextField, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  var navigate = useNavigate();
  var [usr, setUsr] = useState({fName:'',lName:'',username : '', password : ''})
  var [confirmPassword, setConfirmPassword] = useState('')
  var [error, setError] = useState(false);
  var [helperText, setHelperText] = useState(false);

  const inputHandler = (data)=>{
    console.log(data);
    setUsr({...usr,[data.target.name]:data.target.value})
  }
  const handleConfirmPasswordChange = (event) => {
    var val = event.target.value;
    setConfirmPassword(val);
    if(val !== usr.password){
      console.log(false)
      setError(true);
      setHelperText('The Passwords do not match');
    }
    else{
      setError(false);
      setHelperText('The Passwords match');
    }
  };
  const createAcc = ()=>{
    console.log(usr)
    axios.post('http://localhost:3004/createAccount',usr).then((res)=>{
    console.log(res)
    navigate('/login')
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
                  height: 623,
                },
              }}
        >
            <Paper elevation={3}>
                <Grid style={{padding:'10%'}} align={'center'}>
                    <Avatar style={{backgroundColor:'gray'}}> <PersonAddIcon/></Avatar>
                    <Typography variant='h4'>Sign Up</Typography> <br /> <br />
                    <form>
                      <TextField fullWidth type='text' variant='outlined' label='First Name' 
                      onChange={inputHandler} name ='fName' value = {(usr.fName)}/> <br /> <br />
                      <TextField fullWidth type='text' variant='outlined' label='Last Name' 
                      onChange={inputHandler} name ='lName' value = {(usr.lName)}/> <br /> <br />
                      <TextField fullWidth variant='outlined' label='Username' 
                      onChange={inputHandler} name ='username' value = {(usr.username)}/>  <br /> <br />
                      <TextField fullWidth type='password' variant='outlined' label='Password' 
                      onChange={inputHandler} name ='password' value = {(usr.password)}/> <br /> <br />
                      <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={error}
                        helperText={helperText}
                        required
                        fullWidth
                      /> 
                      <Button onClick={createAcc} style={{marginTop:'30px'}} fullWidth variant='contained'>Create Account</Button>
                    </form>
                </Grid> 
            </Paper>
        </Box>
    </div>
  )
}

export default Signup
