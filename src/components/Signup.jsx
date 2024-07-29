import React from 'react'
import './Login.css'
import {Link,FormControlLabel,Checkbox,Grid, Avatar,Typography, Paper, Box, TextField, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  var navigate = useNavigate();
  var [usr, setUsr] = useState({usrname : '', passwrd : ''})
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
    if(val !== usr.passwrd){
      console.log(false)
      setError(true);
      setHelperText('The Passwords do not match');
    }
    else{
      setError(false);
      setHelperText('The Passwords match');
    }
  };
  const handleInput = ()=>{
    
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
                  height: 512,
                },
              }}
        >
            <Paper elevation={3}>
                <Grid style={{padding:'10%'}} align={'center'}>
                    <Avatar style={{backgroundColor:'gray'}}> <PersonAddIcon/></Avatar>
                    <Typography variant='h4'>Sign Up</Typography> <br /> <br />
                    <form onSubmit={handleInput}>
                      <TextField fullWidth variant='outlined' label='Username' 
                      onChange={inputHandler} name ='usrname' value = {(usr.usrname)}/>  <br /> <br />
                      <TextField fullWidth type='password' variant='outlined' label='Password' 
                      onChange={inputHandler} name ='passwrd' value = {(usr.passwrd)}/> <br /> <br />
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
                      <Button style={{marginTop:'30px'}} type='submit' fullWidth variant='contained'>Create Account</Button>
                    </form>
                </Grid> 
            </Paper>
        </Box>
    </div>
  )
}

export default Signup
