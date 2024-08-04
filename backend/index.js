var express=require('express');
require('./connection');
var recipeModel=require('./model/recipe');
var logmodel=require('./model/user');
var cors = require('cors')
var bcrypt = require('bcrypt')

var app=express();
app.use(cors())
app.use(express.json());



//to add data to db
app.post('/add',async(req,res)=>{     
    try {
        await recipeModel(req.body).save()
        res.send("data added")
    } catch (error) {
        console.log(error);
    }
});

app.post('/createAccount',async(req,res)=>{  
    var {fName,lName,username, password} = req.body
    console.log(password)
    console.log(username)
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await logmodel({fName,lName,username, password : hashedPassword}).save()
        res.send("user added")
    } catch (error) {
        console.log(error);
    }
});
app.post('/login',async(req,res)=>{
    var {username , password} = req.body;
    console.log(username)
    console.log(password)
    try {
        var usr =await logmodel.findOne({username});
        if(!usr){
            return res.status(400).send("Invalid Credentials Usrname")
        }
        const isMatch = await bcrypt.compare(password, usr.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials Passwrd");
        }
        res.send({
            fName : usr.fName,
            lName : usr.lName,
            username: usr.username,
          });
    } catch (error) {
        console.log(error);
    }
});

//to view api
app.get('/view',async(req,res)=>{
    try {
        var ingredient =await recipeModel.find();
        res.send(ingredient);
    } catch (error) {
        console.log(error);
    }
});

app.get('/viewusers',async(req,res)=>{
    try {
        var user =await logmodel.find();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

//delete a documents
app.delete('/remove/:id',async(req,res)=>{
    var id=req.params.id
    try {
        await recipeModel.findByIdAndDelete(id);
        res.send("Deleted sucessfully")

    } catch (error) {
        console.log(error);
        
    }
});
app.delete('/removeuser/:id',async(req,res)=>{
    var id=req.params.id
    console.log(id)
    try {
        await logmodel.findByIdAndDelete(id);
        res.send("Deleted sucessfully")

    } catch (error) {
        console.log(error);
        
    }
});


//update
app.put('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    try {
        await recipeModel.findByIdAndUpdate(id,req.body);
        res.send("update done")
    } catch (error) {
        console.log(error);
    }
});


app.listen(3004,()=>{
    console.log("Port is up and running");
})