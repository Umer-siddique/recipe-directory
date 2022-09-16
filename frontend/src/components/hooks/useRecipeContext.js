import { RecipeContext } from "../context/RecipeContext";
import { useContext } from "react";

export const useRecipeContext=()=>{

     const context=useContext(RecipeContext);
     return context;
}
