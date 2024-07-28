import { TextField, Grid, Button } from "@mui/material"
import './Add.css'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
const Add = () => {

    var navigate = useNavigate();
    var location = useLocation();
    console.log(location.state)
    useEffect(()=>{
        if(location.state != null){
          setRecipe({...recipe,name: location.state.val.name, rollno:location.state.val.rollno, class : location.state.val.class, department: location.state.val.department})
        }
    },[])


    var[recipe, setRecipe] = useState({recipeName:"", ingredients :"", instructions :"", image : ""})
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
      // navigate('/view')
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
            <Button style={{marginTop:'10%'} }fullWidth id ='submitButton' variant="contained" onClick={()=>{submit(recipe)}}>Submit</Button>
        </Grid>
        </Grid>
        </div>
    </div>
  )
}

export default Add