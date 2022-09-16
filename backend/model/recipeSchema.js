const mongoose=require('mongoose')

const Schema=mongoose.Schema

const recipeSchema=new Schema({
   title:{
    type:String,
    required:true
   },
   ingredient:{
    type:Array,
    required:true
   },
   method:{
    type:String,
    required:true
   },
   cookingTime:{
    type:String,
    required:true
   },
   recipeImage:{
      type:String
   }

},{timestamps:true})

module.exports=mongoose.model("recipe",recipeSchema)