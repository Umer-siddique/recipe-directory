import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipeContext } from '../../components/hooks/useRecipeContext'
import FileBase from 'react-file-base64'
// styles
import './Create.css'

const Create = () => {
  const Navigate = useNavigate()
  const ingredientsRef = useRef(null)
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [newIngredients, setNewIngredients] = useState([])
  const [method, setMethod] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [recipeImage, setRecipeImage] = useState(null)
  const [error, setError] = useState("")

  const { dispatch } = useRecipeContext()

  const resetForm = () => {
    setTitle("")
    setCookingTime("")
    setMethod("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !method || !cookingTime) {
      setError("All field must be filled")
      return
    }

    // console.log()
    const recipes = {
      title,
      ingredient:newIngredients,
      method,
      cookingTime,
      recipeImage
    }

    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(recipes)
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({
        type: "SET_RECIPE",
        payload: json
      })
      resetForm()
      Navigate("/")
      console.log(json)
    }
  }

  // const handleFile=(e)=>{
  //    const selectedFile=e.target.files[0]
  //    const types=["image/png","image/jpg","image/jpeg"]
  //    if(selectedFile && types.includes(selectedFile.type)){
  //     setRecipeImage(selectedFile)
  //     setError("")
  //    }
  //    else if(!selectedFile){
  //     setRecipeImage(null)
  //     setError("Please select a file.")
  //    }
  //    else if(selectedFile.size > 1000000){
  //     setRecipeImage(null)
  //     setError("Please upload a smaller file only (Image)")
  //    }
  //    else{
  //      setRecipeImage(null)
  //      setError("PLease select an image type(png , jpg or jpeg).")
  //    }

  // }

  const addIngredients = (e) => {
    e.preventDefault()
    const ing = ingredients.trim()

    if (ing && !newIngredients.includes(ing)) {
      setNewIngredients(prevIng => [...prevIng, ing])
      // return [...new Set(prevIng), ingredients]
    }
    setIngredients("")
    ingredientsRef.current.focus()
  }

  return (
    <div className='create'>
      <h1>Add a new Recipe</h1>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Ingredients</span>
          <div className='ingredients__container'>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              ref={ingredientsRef}
            />
            <button onClick={addIngredients}>Add</button>
          </div>
          <ul className="ingredient-list">
            <strong>Current ingredients:</strong>
            {
              newIngredients.map((ing) => <li key={ing}>{ing}</li>)
            }
          </ul>
        </label>
        <label>
          <span>Recipe method</span>
          <textarea
            rows={4}
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>
        <label>
          <span>Cooking Time</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </label>
        <label>
          <span>Recipe Image</span>
          <FileBase
          type="file"
          multiple={false}
          onDone={({base64})=>setRecipeImage(base64)}
          />
        </label>
        <button>Create Recipe</button>
        {error && <div className="error">{error}</div>}
        {/* {file && <div className='error'>{file.name}</div>} */}
      </form>
    </div>
  )
}

export default Create;
