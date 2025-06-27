const bcrypt = require("bcrypt") ; 

const User = require("../models/User") ; 
const jwt = require("jsonwebtoken") ;
const { options } = require("../routes/user");

require("dotenv").config() ; 


// sign up route handler 
exports.signup = async(req,res) => {
      try
      {
            // get data
            const {name , email , password , role } = req.body ;

            // check if user already exist 
            const existingUser = await User.findOne({email}) ;

            if(existingUser)
            {
                  return res.status(400).json({
                        success: false ,
                        message : 'User already exist'  , 
                  }) ; 
            }


            // secure password
            let hashedPassword ; 
            
            try
            {
                  hashedPassword = await bcrypt.hash(password, 10) ;
            }
            catch(err)
            {
                  return res.status(500).json({
                        success :false  ,
                        message : "error in hashing the password" , 
                  });
            }
            

            // create entry for user , db mein entry store krr dii hai , jo signup krne aaya tha
            const user = await User.create({
                  name ,email,password : hashedPassword , role,
            });

            return res.status(200).json({
                  success : true , 
                  message : "user created successfully" , 
            });
                         
      }
      catch(err){
            console.log(err) ; 

            return res.status(500).json({
                  success : "false"  ,
                  message : "error in creating user account ,please try again " ,
            });

      }           
}




//login 


exports.login = async(req , res) => {
      try{
            //data fetch
            const {email , password} = req.body ; 

            //validation on email and password
            if(!email || !password){
                  return res.status(400).json({
                        success : false ,
                        message : "please enter both email and password" ,
                  });
            }

            //check for registered user 
            let user = await User.findOne({email}) ; 

            //if not a registered user
            if(!user)
            {
                  return res.status(400).json({
                        success : false , 
                        message : "user not registered" , 
                  });
            }

            const payload = {
                  email : user.email , 
                  id : user._id ,
                  role : user.role ,
            };

            //verify password and generate the a token
            if(await bcrypt.compare(password , user.password))
            {
                  // password match
                  let token = jwt.sign(payload , process.env.JWT_SECRET , {
                        expiresIn : "2h" , 
                  }) 
                  
                  user = user.toObject() ;
                  user.token = token ; 
                  user.password  = undefined ; // user kii object se remove krr diya , privacy concern 
                  
                  const options = {
                        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) , 
                        httpOnly : true , 
                  }


                  res.cookie("token" , token , options).status(200).json({
                        success : true ,
                        token , 
                        user , 
                        message : "user loged in successfully" ,
                  });
            } 
            else
            {
                  //password do not match
                  return res.status(400).json({
                        success : false , 
                        message : "password incorrect" , 
                  });
            }

      }
      catch(err)
      {
            console.log(err); 
            return res.status(500).json({
                  success : false ,
                  message : "invalid request" ,
            });
      }
};
