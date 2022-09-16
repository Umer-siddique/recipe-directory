const express=require("express")
const dbConnection=require("./dbConfig/db")
const recipeRoutes=require("./routes/recipeRoutes")
const cors=require("cors")
require("dotenv").config()

const app=express()

// database connection
dbConnection()

// Builtin Middllewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

const PORT=process.env.PORT || 8000

// Routes middleware
app.use("/api/recipes",recipeRoutes)

app.listen(PORT,()=>{
 console.log(`Server is listening on port ${PORT}` )
})