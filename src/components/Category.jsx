import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Category = () => {
    var[recipe, setRecipe] = useState([])
  useEffect (()=>{
    axios.get('http://localhost:3004/view').then((response)=>{
    console.log(response);
    setRecipe(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <div style={{marginTop:'9%'}}>
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
            </Card>
            </Grid>
            
          )
        })}
      </Grid>
    </div>
  )
}

export default Category