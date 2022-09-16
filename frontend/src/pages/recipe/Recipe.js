import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipeContext } from '../../components/hooks/useRecipeContext'
import "./Recipe.css"

const Recipe = () => {

  const { id } = useParams()

  // const [singleRecipe, setSingleRecipe] = useState(null)
  const {singleRecipe,dispatch}=useRecipeContext()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {

    const fetchRecipe = async () => {
      setIsPending(true)
      setError(null)

      try {

        const response = await fetch(`http://localhost:5000/api/recipes/${id}`)
        if (!response.ok) {
          throw new Error("No such document exist...")
        }
        const json = await response.json()
        if(response.ok){

          // save single recipe to local storage
          // localStorage.setItem("singleRecipe",JSON.stringify(json))

          dispatch({
            type:"GET_SINGLE_RECIPE",
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

  }, [id,dispatch])

  return (
    <>
      {error && <div className='error'>{error}</div>}
      {isPending && <div className='loading'>Loading...</div>}
      {
        singleRecipe && (
          <div className='recipe-details'>
            <h2>{singleRecipe.title}</h2>
            <p>Take {singleRecipe.cookingTime} minutes to make</p>
            <ul>
              {singleRecipe.ingredient.map((ing) => <li key={ing}>{ing}</li>)}
            </ul>
            <div>{singleRecipe.method}</div>
          </div>
        )}
    </>
  )
}

export default Recipe