import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
import './Home.css'

import { useRecipeContext } from '../../components/hooks/useRecipeContext';

const Home = () => {


  // const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const {recipe,dispatch}=useRecipeContext()

  useEffect(() => {

    const fetchRecipe = async () => {
      setIsPending(true)
      setError(null)

      try {

        const response = await fetch("http://localhost:5000/api/recipes")
        if (!response.ok) {
          throw new Error("Could not fetch the Data...")
        }
        const json = await response.json()
        if(response.ok){
          
          // sava all recipes to local storage
          localStorage.setItem("recipe",JSON.stringify(json))

        dispatch({
          type:"GET_RECIPE",
          payload:json
        })
        }
        console.log(json)
        setIsPending(false)
        setError(null)

      } catch (err) {
        setError(err.message)
        setIsPending(false)
        console.log(err.message)
      }
    }
    fetchRecipe()

  }, [dispatch])

  return (
    <div>
       {recipe && recipe.length===0 && <div className='loading'>No documents exist in your database...</div>}
       {error && <div className='error'>{error}</div>}
       {isPending && <div className='loading'>Loading...</div>}
       {recipe && <RecipeList recipe={recipe}/> }
    </div>
  )
  
}

export default Home