import bcrypt from 'bcrypt';
import {findTouristByEmail , createTourist} from '../models/touristModel';


/******************************Torist****************************************** */
const registerTourist = async(req , res) =>{
    const{FName , LName , Email , password} = req.body;
     
    // first find if exist in the database
   const existedUser = await findToristByEmail(Email);

   try{
   // if exists
   if(existedUser){
     console.log("the user already existed");
     return res.status(400).json({
        message:"invalid Email or Password"
     });
   }

   // hash password
   const hashPassword = await bcrypt.hash(password , 10);

   // create user
      await createTourist(FName , LName , Email , hashPassword);


     res.status(201).json({
            message: "Registered Successfully"
        });


  }catch(err){
       console.log(err);
        res.status(500).json({
            error: err.message
        });

    }
}  

const logInTourist = async(req , res) =>{

    const{Email , password} = req.body;

    // see if it exists

    try{
     const existedUser = await findToristByEmail(Email);

     
        if(!existedUser){
             console.log("the user doesn't exist");
             return res.status(400).json({
             message:"invalid Email or Password"
             });
        }

        //Compare the two passwords
        const passwordCheck= await bcrypt.compare(password , existedUser.Password);
        if(passwordCheck){
            res.status(200).send('logged in successfully')
        }else{
            console.log("the user doesn't exist");
            return res.status(400).json({
            message:"invalid Email or Password"
            });
        }

     }catch(err){
       console.log(err);
        res.status(500).json({
            error: err.message
        });

    }
}


/******************************guide**************************/

