import React from 'react'
import {ListItem,Collapse,IconButton,Box,List,ListItemText,ListItemButton,ListItemIcon, Grid, Card, CardContent, Typography, CardActions, Button, CardMedia, useStepContext } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { UserProvider, useUser } from './UserContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const {user} = useUser();
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

  const deleteRecipe = (id)=>{
    console.log(id)
    axios.delete('http://localhost:3004/remove/'+id).then((response)=>{
    console.log(response);
    window.location.reload(true);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                <Typography variant="body2">
                  Categories : {data.categories}
                </Typography>
              </CardContent>
              {user ?(
                  user._id == data.userid ?(
                    <CardActions>
                      <Button id ="editButton" onClick={()=>{clickUpdate(data)}} variant="contained" size="small">Edit</Button>
                      <Button size="small" onClick={()=>{deleteRecipe(data._id)}} variant="contained" id="deleteButton">Delete</Button>
                    </CardActions>
                  ):null
              ):null}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Ingredients : {data.ingredients} </Typography>
                  <Typography variant='body1' paragraph>Instructions:</Typography>
                  <Typography paragraph>
                    {data.instructions}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Home
