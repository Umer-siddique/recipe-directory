const Recipe=require("../model/recipeSchema")
const mongoose = require("mongoose")
// const multer=require("multer")

// creating storage for image
// const storage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//    cb(null,"../../frontend/public/uploads/")
//   },
//    filename:(req,file,cb)=>{
//      cb(null,file.originalname)
//    }
// })

// const upload=multer({storage:storage})

const getRecipes=async(req,res)=>{
  // res.status(201).json({msg:"Get all recipes"})
  try{
     const recipes=await Recipe.find({}).sort({createdAt:-1})
     if(!recipes){

      throw new Error("Could not found Data..")
     }
        // get back the data
      res.status(200).json(recipes)

  }catch(error){
     res.status(404).json({error:error.message})
  }
}

const setRecipe=async(req,res)=>{
  const {title, ingredient,method,cookingTime,recipeImage}=req.body;
  // const {recipeImage}=req.file.orignalname;
   
  try{

    if(!title || !method || !cookingTime){
      throw new Error("All field must be filled")
     }

     const recipe=await Recipe.create({title, ingredient,method,cookingTime,recipeImage})
     res.status(201).json(recipe)
  }catch(error){
      res.status(404).json({error:error.message})
  }
  
  // res.status(201).json({msg:"Set a recipes"})
  
}

const getSingleRecipe=async(req,res)=>{
  const {id}=req.params

  try{
      const singleRecipe=await Recipe.findById(id)

      if(!singleRecipe){
        throw new Error("No such documents exist")
      }
      return res.status(200).json(singleRecipe)
  }catch(error){
       res.status(404).json({error:error.message})
  }
  // res.status(201).json({msg:"Individual Recipe"})
  
}

const updateRecipe=async(req,res)=>{
  const {id}=req.params
  try{
   
    const updatedRecipe=await Recipe.updateOne({_id:id},{
      $set:req.body,
    })
    res.status(200).json(updatedRecipe)

  }catch(error){
    res.status(404).json({error:error.message})
  }
 
}

const deleteRecipe=async(req,res)=>{
  const {id}=req.params;
  try{
   
    const deletedRecipe=await Recipe.findOneAndDelete({_id:id})
    res.status(200).json(deletedRecipe)

  }catch(error){
     res.status(404).json({error:error.message})
  }
  // res.status(200).json({msg:"Delete a recipe"})
  
}

const searchRecipe=async(req,res)=>{ 
  try{
     const search=await Recipe.find({
      "$or":[
        {"title":{$regex:req.params.key}}
      ]
     })
     if(search.length===0){
       throw new Error("Search result not found...")
     }
     res.status(200).json(search)
  }catch(error){
      res.status(404).json({error:error.message})
  }

}

module.exports={
  getRecipes,
  setRecipe,getSingleRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipe,

}