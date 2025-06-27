const express = require("express") ;
const app = express() ;

require("dotenv").config() ; 

const PORT = process.env.PORT || 4000 ; 

app.use(express.json()) ; 


require("./config/database").connect() ; 

app.get("/" , (req,res)=> {
      console.log("Server is running") ;
      res.send("<h1>hii hello we are here </h1>")
}); 


//route import and mount
const user = require("./routes/user") ; 

app.use("/api/v1" , user) ; 


//activate
app.listen(PORT , () => {
      console.log(`app is listening at ${PORT}`) ; 
});
