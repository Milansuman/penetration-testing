var express=require('express');
require('./connection');
var model=require('./model/ingredient');

var app=express();
app.use(express.json());



//to add data to db
app.post('/add',async(req,res)=>{     
    try {
        await model(req.body).save()
        res.send("data added")
    } catch (error) {
        console.log(error);
    }
});

//to view api
app.get('/view',async(req,res)=>{
    try {
        var ingredient =await model.find();
        res.send(ingredient);
    } catch (error) {
        console.log(error);
    }
});

//delete a documents
app.delete('/remove/:id',async(req,res)=>{
    var id=req.params.id
    try {
        await model.findByIdAndDelete(id);
        res.send("Deleted sucessfully")

    } catch (error) {
        console.log(error);
        
    }
});


//update
app.put('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    try {
        var ingredient=await model.findByIdAndUpdate(id,req.body);
        res.send("update done")
    } catch (error) {
        console.log(error);
    }
});


app.listen(3004,()=>{
    console.log("Port is up and running");
})