import { Box,Paper,TextField, Grid, Button, Typography } from "@mui/material"
import './Add.css'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
const Add = () => {

    var navigate = useNavigate();
    var location = useLocation();
    console.log('location :')
    console.log(location.state)
    console.log('useEffect')
    console.log(recipe)
    var[recipe, setRecipe] = useState({recipeName:"", ingredients :"", instructions :"", image : ""})
    useEffect(()=>{
      if(location.state != null){
        setRecipe({...recipe,recipeName: location.state.val.recipeName, ingredients:location.state.val.ingredients, instructions : location.state.val.instructions, img: location.state.val.img})
      }
    },[])
    const inputHandler = (v)=>{
        console.log(v)
        setRecipe({...recipe,[v.target.name]:v.target.value})
    }

    const submit = ()=>{
      if(location.state != null){
        axios.put('http://localhost:3004/edit/'+location.state.val._id,recipe).then((res)=>{
          console.log(res.data)
        }).catch((error)=>{
            console.log(error);
        })
      }
      else{
        console.log(recipe)
        axios.post('http://localhost:3004/add',recipe).then((res)=>{
          console.log(res.data)
        }).catch((error)=>{
          console.log(error);
        })
      }
      navigate('/')
      }
  return (
    <div>
        <div className="divadd">
        <br />
        <Box justifyContent={'center'}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 612,
                  height: 512,
                },
              }}
        >
        <Paper style={{paddingTop:'5%'}} elevation={3}>
        <Typography align="center" style={{textDecorationThickness:'10%'}} variant="h3">Add Recipe</Typography>
        <Grid style={{paddingTop:'5%'}} justifyContent={"center"} container spacing={2}>
        <Grid item xs={8} md={6}>
            <TextField required fullWidth variant='outlined' label='Name of the Recipe' 
            onChange={inputHandler} name ='recipeName' value = {(recipe.recipeName)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Ingredients'
            onChange={inputHandler} name='ingredients' value = {(recipe.ingredients)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Recipe Instructions'
            onChange={inputHandler} name='instructions' value = {(recipe.instructions)}/><br /> <br />
            <TextField required fullWidth variant='outlined' type="url" label='Image'
            onChange={inputHandler} name='img' value = {(recipe.img)}/><br /> <br />
            <Button style={{marginTop:'10%'} }fullWidth id ='submitButton' variant="contained" onClick={submit}>Submit</Button>
        </Grid>
        </Grid>
        </Paper>
        </Box>
        </div>
    </div>
  )
}

export default Add