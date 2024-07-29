import { TextField, Grid, Button } from "@mui/material"
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
    var[recipe, setRecipe] = useState({recipeName:"", ingredients :"", instructions :"", image : "",categories:""})
    useEffect(()=>{
      if(location.state != null){
        setRecipe({...recipe,recipeName: location.state.val.recipeName, ingredients:location.state.val.ingredients, instructions : location.state.val.instructions, img: location.state.val.img,categories:location.state.val.categories})
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
        <Grid justifyContent={"center"} container spacing={2}>
        <Grid item xs={8} md={4}>
            <TextField required fullWidth variant='outlined' label='Name of the Recipe' 
            onChange={inputHandler} name ='recipeName' value = {(recipe.recipeName)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Ingredients'
            onChange={inputHandler} name='ingredients' value = {(recipe.ingredients)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Recipe Instructions'
            onChange={inputHandler} name='instructions' value = {(recipe.instructions)}/><br /> <br />
            <TextField required fullWidth variant='outlined' type="url" label='Image'
            onChange={inputHandler} name='img' value = {(recipe.img)}/><br /> <br />
            <TextField required fullWidth variant='outlined' type="outlined" label='categories'
            onChange={inputHandler} name='categories' value = {(recipe.categories)}/><br /> <br />
            <Button style={{marginTop:'10%'} }fullWidth id ='submitButton' variant="contained" onClick={submit}>Submit</Button>
        </Grid>
        </Grid>
        </div>
    </div>
  )
}

export default Add