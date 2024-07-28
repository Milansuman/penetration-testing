var mongoose =require('mongoose');

var ingredient_schema=mongoose.Schema({
    recipeName : String,
    ingredients : String,
    instructions : String,
    img : String

});
var ingreModel=mongoose.model("ingredient",ingredient_schema);
module.exports=ingreModel;