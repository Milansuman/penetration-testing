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
import { Delete, DeleteRounded, Edit } from '@mui/icons-material';


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
              <Card class='MuiCard-root' sx={{flexGrow:1}}>
              <CardContent>
                <Typography class='MuiTypography-h5' variant="h5" component="div">
                  First Name : {data.fName}
                </Typography>
                <Typography class='MuiTypography-h5' sx={{ mb: 1.5 }} color="text.secondary">
                  Last Name : {data.lName}
                </Typography>
                <Typography class='MuiTypography-h5' sx={{ mb: 1.5 }} color="text.secondary">
                  Username : {data.username}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={()=>{deleteUsr(data._id)}} variant="contained" id="deleteButton"><Delete/></IconButton>
                <IconButton size="small" onClick={()=>{navigate('/profile',{state:{val:data._id}})}} variant="contained" id="editButton"><Edit/></IconButton>
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
                  Category : {data.categories}
                </Typography>
              </CardContent>
              <CardActions>
              <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                <ExpandMoreIcon id='expandMoreButton' />
              </ExpandMore>
                    <IconButton size="small" onClick={()=>{deleteRecipe(data._id)}} variant="contained" id="deleteButton"><Delete/></IconButton>
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
    <div id='admin' style={{marginTop:'7%'}}>
    <Grid style={{marginTop:'5%'}} justifyContent={"flex-start"} container spacing={2}>
    <Grid xs={6} md={3}>
    <Box sx={{ width: 250 }}>
      <List>
        {['Users', 'Recipes'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(index)}>
              <ListItemIcon class='ListItemIcon'>
                {index % 2 === 0 ? <GroupIcon/> : <FormatListBulletedIcon/>}
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