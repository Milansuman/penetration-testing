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
  Typography,
  Collapse,
  IconButton
} from '@mui/material'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useUser } from './UserContext';
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

const Admin = () => {
  const [expanded, setExpanded] = useState(false);
  const {user} = useUser();
  const [openUsers, setopenUsers] = useState(true);
  const [showRecipes, setShowRecipes] = useState(false);
  var [usrs, setUsrs] = useState([])
  var navigate = useNavigate();
  var[recipe, setRecipe] = useState([])
  useEffect(() => {
    if (!user) {
      navigate('/login');
      window.alert('Please log in to view this content!');
      return;
    }
    if (user._id !== '66af3c474dc01b4ebd4c6a28') {
      navigate('/');
      window.alert('You do not have admin privileges!');
      return;
    }
   }
  )
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteRecipe = (id)=>{
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
                <Button size="small" onClick={()=>{navigate('/profile',{state:{val:data._id}})}} variant="contained" id="editButton">Edit</Button>
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
                <Typography variant="body2">
                  Categories : {data.categories}
                </Typography>
              </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>{deleteRecipe(data._id)}} variant="contained" id="deleteButton">Delete</Button>
                  </CardActions>
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
  );

}

export default Admin