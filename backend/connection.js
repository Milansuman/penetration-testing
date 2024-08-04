var mongoose =require('mongoose');

mongoose.connect("mongodb+srv://Adisankar:GYQa1MakUgpK2uqL@cluster0.3nnx8jj.mongodb.net/recipeApp?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})