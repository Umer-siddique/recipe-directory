import React from 'react'
import { Link } from 'react-router-dom'
import { BiTrash } from 'react-icons/bi'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import { useNavigate } from 'react-router-dom'

// styles
import './RecipeList.css'
import { useRecipeContext } from './hooks/useRecipeContext'

const RecipeList = ({ recipe }) => {

  const { dispatch } = useRecipeContext()
  const Navigate = useNavigate()

  const deleteRecipe = async (id) => {
    const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: "DELETE",
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({
        type: "DELETE_RECIPE",
        payload: json
      })
      console.log("Deleted Recipe", json)
    }

  }

  const handleNavigate = (id) => {
    Navigate(`/update/${id}`)
  }


  return (
    <div className='recipe-list'>
      {
        recipe.map((recipes) => {
          return (
            <div className="card" key={recipes._id}>
              <div className='img-div'>
                <img src={recipes.recipeImage} alt="Recipe Image" />
              </div>
              <div className='recipe-info'>
                <h2>{recipes.title}</h2>
                <p>{recipes.cookingTime} minutes to make</p>
                <div>{recipes.method.substring(0, 100)}</div>
                <Link to={`/recipes/${recipes._id}`}>Cook This</Link>
                <div className='trash-div' title='Delete recipe' onClick={() => deleteRecipe(recipes._id)} ><BiTrash className='trash-can' /></div>
                <div className='trash-div' title='Update recipe' onClick={() => handleNavigate(recipes._id)}><HiOutlinePencilAlt className='trash-can' /></div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecipeList