import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { newCustomer } from "../models/customerSchema.js"

dotenv.config({path:"./config.env"})

let generateToken = async (user) => {
    try{

        let options = {
            expiresIn : "1hr"
        }

        let payload = {
            userId : user
        }

        let token = await jwt.sign(payload, process.env.jwt_secret_key,options)

        // store token in database for further check !

        if(!token){
            throw("unable to genrate token !")
        }

        console.log(user)

        let result = await newCustomer.updateOne({ email: user } , {$set: { token : token } } )

        console.log(result)

        return token

    }catch(err){
        console.log("error while generating a token ! " , err)
    }
}

export {generateToken}