import { TextField, Grid, Button } from "@mui/material"
import './Add.css'
import { useState } from "react"
const Add = () => {
    var[recipe, setRecipe] = useState({recipeName:"", ingredients :"", instructions :"", image : ""})
    const inputHandler = (v)=>{
        console.log(v)
        setRecipe({...recipe,[v.target.name]:v.target.value})
    }
  return (
    <div>
        <div className="divadd">
        <br />
        <Grid justifyContent={"center"} container spacing={2}>
        <Grid item xs={8} md={4}>
            <TextField required fullWidth variant='outlined' label='Name of the Recipe' 
            onChange={inputHandler} name ='recipeName' value = {(recipe.name)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Ingredients'
            onChange={inputHandler} name='ingredients' value = {(recipe.ingredients)}/> <br /> <br />
            <TextField multiline required fullWidth variant='outlined' label='Recipe Instructions'
            onChange={inputHandler} name='instructions' value = {(recipe.inst)}/><br /> <br />
            <TextField required fullWidth variant='outlined' label='Image'
            onChange={inputHandler} name='image' value = {(recipe.image)}/><br /> <br />
            <Button style={{marginTop:'10%'} }fullWidth id ='submitButton' variant="contained">Submit</Button>
        </Grid>
        </Grid>
        </div>
    </div>
  )
}

export default Add