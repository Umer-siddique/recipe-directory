const express=require("express")

const router=express.Router()

// Create signup user
router.post("/signup",createSignup)

// create login user
router.post("/login",createLogin)

// get users
router.get("/")

module.exports=router