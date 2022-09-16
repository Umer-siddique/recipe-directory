const express=require("express")
const {
    getRecipes,
    setRecipe,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipe,
    }=require('../controller/recipeController')

const router=express.Router()

// get all recipes
router.get("/",getRecipes)

// create a new recipe
router.post("/",setRecipe)

// get a single recipe
router.get("/:id",getSingleRecipe)

// update recipe
router.put("/update/:id",updateRecipe)

// delete a recipe
router.delete("/:id",deleteRecipe)

// Search recipe
router.get("/search/:key",searchRecipe)

module.exports=router