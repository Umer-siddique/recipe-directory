import React, { useState, useRef,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {

    const Navigate = useNavigate()
    const ingredientsRef = useRef(null)
    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [newIngredients, setNewIngredients] = useState([])
    const [method, setMethod] = useState("")
    const [cookingTime, setCookingTime] = useState("")

    // const { dispatch } = useRecipeContext()
    const {id}=useParams()

    const resetForm = () => {
        setTitle("")
        setCookingTime("")
        setMethod("")
    }

    const handleUpdate=async(e)=>{
        e.preventDefault()
        const updatedRecipes = {
            title,
            ingredient: newIngredients,
            method,
            cookingTime
          }
        const response=await fetch(`http://localhost:5000/api/recipes/update/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedRecipes)
        })
        const json=await response.json()
        console.log(json)
        if(response.ok && json){
            Navigate("/")
            resetForm()
        }
    }

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

    // Get a single product
    useEffect(() => {
        const getSingleProduct=async(id)=>{
            const response=await fetch(`http://localhost:5000/api/recipes/${id}`)
            if(!response.ok){
                console.log("No Such documents exist..")
                return 
            }
            const json=await response.json()
            console.log(json)
            setTitle(json.title)
            setIngredients("update ingredients / Rewrite ingredients")
            setMethod(json.method)
            setCookingTime(json.cookingTime)
        }

       getSingleProduct(id)
    }, [id]);


    return (
        <div className='update'>
            <div className='update-form'>
                <div className='create'>
                    <h1>Update your Recipe</h1>
                    <form onSubmit={handleUpdate}>
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
                        <button>Update Recipe</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update