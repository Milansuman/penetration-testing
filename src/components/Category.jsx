import {CardActions,Button,Collapse,Box,IconButton,ListItem,ListItemButton,ListItemIcon,ListItemText,List,Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import { Delete, Edit } from '@mui/icons-material';

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

const Category = () => {
  const {user} = useUser();
  var navigate = useNavigate();
  var[categories, setCategories] = useState([])
  const [expanded, setExpanded] = useState(false);
  var[recipe, setRecipe] = useState([])
  var [filteredRecipes, setFilteredRecipes] = useState([]);
  useEffect (()=>{
    axios.get('http://localhost:3004/view').then((response)=>{
    console.log(response);
    setRecipe(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const deleteRecipe = (id)=>{
    console.log(id)
    axios.delete('http://localhost:3004/remove/'+id).then((response)=>{
    console.log(response);
    window.location.reload(true);
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect (()=>{
    var newCategories = Array.from(new Set(recipe.map(val => val.categories)));
    setCategories(newCategories)
    console.log(categories)
  },[recipe])

  const filterRecipes = (selectedCategory)=>{
    setFilteredRecipes(recipe.filter(data => data.categories.includes(selectedCategory)));
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clickUpdate = (data)=>{
    navigate('/add', {state :{val : data}})
    console.log(data);
  }

  const showRecipe = (
    <Grid justifyContent={"flex-start"} container spacing={2}>
        {filteredRecipes.map((data)=>{
          return(
            <Grid key = {data.id} item xs={6} md={3}>
              <Card class='MuiCard-root' sx={{flexGrow:1}}>
              <CardMedia
                sx={{ height: 140 }}
                image={data.img}
                title={data.recipename}
              />
              <CardContent>
                <Typography class='MuiTypography-h5' variant="h5" component="div">
                  {data.recipeName}
                </Typography>
                <Typography class='MuiTypography-body2' variant="body2">
                  Categories : {data.categories}
                </Typography>
              </CardContent>
              <CardActions>
              <ExpandMore id='expandMoreButton'
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              {user ?(
                user._id == data.userid ?(
                <CardActions>
                  <IconButton id ="editButton" onClick={()=>{clickUpdate(data)}} variant="contained" size="small"><Edit/></IconButton>
                  <IconButton size="small" onClick={()=>{deleteRecipe(data._id)}} variant="contained" id="deleteButton"><Delete/></IconButton>
                </CardActions>
                ):null
              ):null}
              </CardActions>
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
  )
  
  return (
    <div style={{marginTop:'9%'}}>
      <Grid style={{marginTop:'5%'}} justifyContent={"flex-start"} container spacing={2}>
        <Grid xs={6} md={3}>
        <Box sx={{ width: 250 }}>
          <List>
            {categories.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton onClick={()=>{filterRecipes(cat)}}>
                  <ListItemIcon class='ListItemIcon'>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary={cat} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        </Grid>
        <Grid style={{marginTop:'1%'}} item xs={12} sm={6} md={9}>
          {showRecipe}
        </Grid>
      </Grid> 
    </div>
  )
}

export default Category