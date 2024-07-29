import React from 'react'
import { Grid, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
  var navigate = useNavigate();
  var[recipe, setRecipe] = useState([])
  useEffect (()=>{
    axios.get('http://localhost:3004/view').then((response)=>{
    console.log(response);
    setRecipe(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])  //variable in the dependency array will run the hook everytime the variable changes

  const deleteStudent = (id)=>{
    console.log(id)
    axios.delete('http://localhost:3004/remove/'+id).then((response)=>{
    console.log(response);
    window.location.reload(true);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const clickUpdate = (data)=>{
    navigate('/add', {state :{val : data}})
    console.log(data);
  }
  return (
    <div id = 'homeBackground'>
      <Grid justifyContent={"flex-start"} container spacing={2}>
        {recipe.map((data)=>{
          return(
            <Grid key = {data.id} item xs={6} md={3}>
              <Card sx={{flexGrow:1}}>
              <CardMedia
                sx={{ height: 140 }}
                image={data.img}
                title={data.recipename}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {data.recipeName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data.instructions}
                </Typography>
                <Typography variant="body2">
                  Ingredients : {data.ingredients}<br/>
                  Categories : {data.categories}
                </Typography>
              </CardContent>
              <CardActions>
                <Button id ="editButton" onClick={()=>{clickUpdate(data)}} variant="contained" size="small">Edit</Button>
                <Button size="small" onClick={()=>{deleteStudent(data._id)}} variant="contained" id="deleteButton">Delete</Button>
              </CardActions>
            </Card>
            </Grid>
            
          )
        })}
      </Grid>
    </div>
  )
}

export default Home
