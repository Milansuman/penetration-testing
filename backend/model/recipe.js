var mongoose =require('mongoose');

var recipe_schema=mongoose.Schema({
    recipeName : String,
    ingredients : String,
    instructions : String,
    img : String,
    categories:String,
    userid:String

});
var recipeModel=mongoose.model("recipes",recipe_schema);
module.exports=recipeModel;