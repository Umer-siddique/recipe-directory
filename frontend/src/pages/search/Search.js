import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'

import { useRecipeContext } from '../../components/hooks/useRecipeContext'
import RecipeList from '../../components/RecipeList'

const Search = () => {

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const {recipe,dispatch}=useRecipeContext()

  const queryString=useLocation().search
  const queryParams=new URLSearchParams(queryString)
  const query=queryParams.get("q")

  // const query1=query[0].toLocaleUpperCase()
  // const query2=query.slice(1)
  // const sumQuery=query1+query2


  useEffect(() => {

    const fetchRecipe = async () => {
      setIsPending(true)
      setError(null)

      try {

        const response = await fetch(`http://localhost:5000/api/recipes/search/${query}`)
        if (!response.ok) {
          throw new Error(`No recipe found coresponding to " ${query} "`)
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

  }, [dispatch,query])

  return (
    <div className='search'>
        {!error && <h2 className='loading'>Recipe Including " {query} "</h2>}
        {isPending && <h1 className='loading'>Loading...</h1>}
        {error && <h1 className='error'>{error}</h1>}
        {!error && recipe && <RecipeList recipe={recipe}/>}
    </div>
  )
}

export default Search