const express = require("express") ;
const router = express.Router() ; 


// Express.js is used in your blog app to handle routing, middleware, and request/response cycle, making the backend clean and modular.

// You can use Express.js to create RESTful APIs, handle HTTP requests, and interact with your 
// database. It's a popular choice for building web applications and APIs.


const {login ,  signup} = require("../Controllers/Auth") ; 
const {auth , isStudent , isAdmin} = require("../middlewares/auth") ;

router.post("/login" , login) ;   
router.post("/signup" , signup) ; 

//testing route for a single middleware
router.get("/test" , auth , (req,res) => {
      res.json({
            message : "Hello , this is a protected route of test" , 
            success : true , 
      });
});


// protected route 
router.get("/student" , auth , isStudent , (req , res) => {
      res.json({
            success  :true  , 
            message : "welcome to the protected routes of students" , 
      });
})


router.get("/admin" , auth , isAdmin , (req,res) => {
      res.json({
            success : true ,
            message : "welcome to the protected route of admin" ,
            });
});
module.exports = router ; 