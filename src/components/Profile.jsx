import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {Grid, Avatar,Typography,TextField, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Profile = () => {
  const [user, setUser] = useState({ fName: '', lName: '', username: '' });
  const navigate = useNavigate();
  const location = useLocation();
  var [confirmPassword, setConfirmPassword] = useState('')
  var [error, setError] = useState(false);
  var [helperText, setHelperText] = useState(false);


  const inputHandler = (data)=>{
    console.log(data);
    setUser({...user,[data.target.name]:data.target.value})
  }

  useEffect(() => {
    if (location.state && location.state.val) {
      axios.get(`http://localhost:3004/profile/${location.state.val}`)
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            setUser({...user,fName:res.data.fName, lName:res.data.lName, username:res.data.username});
          } else {
            console.log("Error with res");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert("No user ID found in location state");
    //   navigate('/');
    }
  }, [location.state, navigate]);

  const handleConfirmPasswordChange = (event) => {
    var val = event.target.value;
    setConfirmPassword(val);
    if(val !== user.password){
      console.log(false)
      setError(true);
      setHelperText('The Passwords do not match');
    }
    else{
      setError(false);
      setHelperText('The Passwords match');
    }
  };

  const submit =()=>{
    axios.put('http://localhost:3004/profileedit/'+location.state.val,user).then((res)=>{
        console.log(res.data)
      }).catch((error)=>{
        console.log(error);
      })
    //   navigate('/')
    }

  return (
    <div>
        <Grid justifyContent={"center"} container spacing={2}>
            <Grid style={{padding:'10%'}}>
                <Typography style={{paddingTop:'10%',fontWeight:'20px'}} variant='h2'>Profile</Typography> <br /> <br />
                {/* <Avatar style={{backgroundColor:'gray'}}> <PersonAddIcon/></Avatar> */}
                <form>
                    <TextField fullWidth type='text' variant='outlined' label='First Name' 
                    onChange={inputHandler} name ='fName' value = {(user.fName)}/> <br /> <br />
                    <TextField fullWidth type='text' variant='outlined' label='Last Name' 
                    onChange={inputHandler} name ='lName' value = {(user.lName)}/> <br /> <br />
                    <TextField fullWidth variant='outlined' label='Username' 
                    onChange={inputHandler} name ='username' value = {(user.username)}/>  <br /> <br />
                    <TextField fullWidth type='password' variant='outlined' label='Password' 
                    onChange={inputHandler} name ='password' value = {(user.password)}/> <br /> <br />
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
                    <Button onClick={submit} style={{marginTop:'30px'}} fullWidth variant='contained'>Submit</Button>
                </form>
                </Grid> 
        </Grid>
        
    </div>
  );
};

export default Profile;