import { newCustomer } from "../models/customerSchema.js"
import bcrypt from "bcrypt"
import { generateToken } from "../middleware/generateToken.js"

let userRegisteration = async (req, res) => {
    try {

        console.log(req.body)

        let newUser = req.body

        // no same email and phone

        let checkEntry = await newCustomer.findOne({ $or: [{ email: newUser.email }, { phone: newUser.phone }] })

        if (checkEntry) {
            throw ("user already exits ! change phone or email !")
        }

        let entry = new newCustomer(newUser)

        let result = await entry.save()

        res.status(202).json({ message: `${newUser.name} ! has been registred successfully !` })

    } catch (err) {
        console.log("unable to register a user !", err)
    }
}

let userLogin = async (req, res) => {
    try {

        let userData = req.body
        // userData = {mail, password}

        console.log(userData)

        let checkEntry = await newCustomer.findOne({ email: userData.email })
        // if user exists the checkEntry will have user object from database

        if (!checkEntry) {
            throw ("user email does not exists !")
        }

        // compare password with encrypted password

        let result = await bcrypt.compare(userData.password, checkEntry.password)

        console.log(result)

        // make a session/token using jwt if result is true

        if (!result) {
            throw ("wrong email or password !")
        }

        let token = await generateToken(checkEntry.email)

        console.log(token)

        res.status(202).json({ message: "login was successful !", whoami: checkEntry.email, token: token })

    } catch (err) {
        console.log("unable to login ! ", err)
        res.status(400).json({ message: err })
    }
}

let clientDashboard = async (req, res) => {
    try {

        let userData = req.userData
        console.log("welcome ! ",req.userData.name)
        console.log("dashboard access granted !")

       res.status(200).json({message:`Welcome ! ${userData.name}.` , userData }) 

    } catch (err) {
        res.status(400).json({message:"some error validating user !" , err})
    }
}

export { userRegisteration, userLogin, clientDashboard }