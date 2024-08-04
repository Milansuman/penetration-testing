import { Box,ListItem,ListItemButton,ListItemIcon,ListItemText,List,Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Category = () => {
  var[categories, setCategories] = useState([])
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

  useEffect (()=>{
    var newCategories = Array.from(new Set(recipe.map(val => val.categories)));
    setCategories(newCategories)
    console.log(categories)
  },[recipe])

  const filterRecipes = (selectedCategory)=>{
    setFilteredRecipes(recipe.filter(data => data.categories.includes(selectedCategory)));
  }

  const showRecipe = (
    <Grid justifyContent={"flex-start"} container spacing={2}>
        {filteredRecipes.map((data)=>{
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
                  <ListItemIcon>
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