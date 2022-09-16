import { createContext, useReducer,useEffect } from "react";

export const RecipeContext = createContext()

const recipeReducer = (state, action) => {
    switch (action.type) {
        case "GET_RECIPE":
            return { ...state, recipe: action.payload }
        case "GET_SINGLE_RECIPE":
            return { ...state, singleRecipe: action.payload }
        case "SET_RECIPE":
            return {
                ...state, recipe: [action.payload, ...state.recipe]
            }
        case "DELETE_RECIPE":
            return {
                ...state, recipe: state.recipe.filter((deleteRecipe) => {
                    return deleteRecipe._id !== action.payload._id;
                })
            }
        default:
            return state;
    }
}

export const RecipeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(recipeReducer, {
        recipe: null,
        singleRecipe: null,
    })
    console.log("Recipe:", state)
    //   console.log("Single Recipe:",state.singleRecipe)

    useEffect(() => {
        const recipe = JSON.parse(localStorage.getItem('recipe'))
        if (recipe) {
            dispatch({
                type: "GET_RECIPE",
                payload: recipe
            })
        }

    }, []);

    return (
        <RecipeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipeContext.Provider>
    )
}