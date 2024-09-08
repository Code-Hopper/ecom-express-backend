// verify client token with jwt.verify, then check if it is valid, if it is then next() , if not then reject
import jwt from "jsonwebtoken"
import { newCustomer } from "../models/customerSchema.js"

let authUser = async (req, res, next) => {

    try {

        // we are excepting a user token

        let userToken = req.headers.authorization
        

        if(!userToken){
            throw("no token found !")
        }

        let isUserValid = await jwt.verify(userToken,process.env.jwt_secret_key)

        if(!isUserValid){
            throw("invalid token !")
        }

        console.log(isUserValid.userId)

        // console.log("auth user function running ")

        // check if token is valid using database

        let customerData = await newCustomer.findOne({email:isUserValid.userId , token: userToken }) 

        if(!customerData){
            throw("customer not found please register first !")
        }

        console.log("customer info : " , customerData)

        req.userData = customerData

        next()

    } catch (err) {
        console.log("error while auth", err)
        res.status(401).json({ message: "not a valid request !" })
    }

}

export { authUser }