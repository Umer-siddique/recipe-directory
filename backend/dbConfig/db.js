const mongoose=require("mongoose")


   const dbConnection=async()=>{
      try{
         const db = await mongoose.connect(process.env.MONGO_URI)
         console.log(`Connected to Database ${db.connection.host}`)

      }catch(err){
         console.log(err)
         process.exit(1)
      }
   }
   

module.exports= dbConnection