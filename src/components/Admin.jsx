import {
  Box,
  ListItem,
  ListItemIcon,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Card, CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography 
} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const Admin = () => {
  const [openUsers, setopenUsers] = useState(true);
  const [showRecipes, setShowRecipes] = useState(false);
  var [usrs, setUsrs] = useState([{fName:'',lName:'',username : ''}])
  var navigate = useNavigate();
  var[recipe, setRecipe] = useState([])
  useEffect (()=>{
    axios.get('http://localhost:3004/view').then((response)=>{
    console.log(response);
    setRecipe(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  useEffect (()=>{
    axios.get('http://localhost:3004/viewusers').then((response)=>{
    console.log(response);
    setUsrs(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const deleteUsr = (id)=>{
    console.log(id)
    axios.delete('http://localhost:3004/removeuser/'+id).then((response)=>{
    console.log(response);
    window.location.reload(true);
    }).catch((error)=>{
      console.log(error);
    })
  }

  const deleteIngredient = (id)=>{
    console.log(id)
    axios.delete('http://localhost:3004/remove/'+id).then((response)=>{
    console.log(response);
    window.location.reload(true);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const handleListItemClick = (index) => {
    if (index === 1) {
      setopenUsers(false);
      setShowRecipes(true);
    } 
    else if (index == 0){
      setShowRecipes(false);
      setopenUsers(true);
    }
  };

  const showUsers = (
    <Grid justifyContent={"flex-start"} container spacing={2}>
        {usrs.map((data)=>{
          return(
            <Grid key = {data._id} item xs={6} md={3}>
              <Card sx={{flexGrow:1}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {data.fName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data.lName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data.username}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>{deleteUsr(data._id)}} variant="contained" id="deleteButton">Delete</Button>
              </CardActions>
            </Card>
            </Grid>
          )
        })}
      </Grid>
  )

  const showRecipe = (
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
                <Button size="small" onClick={()=>{deleteIngredient(data._id)}} variant="contained" id="deleteButton">Delete</Button>
              </CardActions>
            </Card>
            </Grid>
            
          )
        })}
      </Grid>
  )

  return (
    <div id='admin' style={{marginTop:'7%'}}>
       <Grid style={{marginTop:'5%'}} justifyContent={"flex-start"} container spacing={2}>
        <Grid xs={6} md={3}>
        <Box sx={{ width: 250 }}>
          <List>
            {['Users', 'Recipes'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <GroupIcon /> : <FormatListBulletedIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        </Grid>
        <Grid style={{marginTop:'1%'}} item xs={12} sm={6} md={9}>
          {showRecipes && showRecipe}
          {openUsers && showUsers}
        </Grid>
      </Grid> 
    </div>
  )
}

export default Admin