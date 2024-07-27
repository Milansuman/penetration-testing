var mongoose =require('mongoose');

var ingredient_schema=mongoose.Schema({
    ingredients:String

});
var ingreModel=mongoose.model("ingredient",ingredient_schema);                    
module.exports=ingreModel;