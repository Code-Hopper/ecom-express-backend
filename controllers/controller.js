import { newCustomer } from "../models/customerSchema.js"

let userRegisteration = async (req, res) => {
    try {

        console.log(req.body)

        let newUser = req.body

        // no same email and phone

        let checkEntry = await newCustomer.findOne({ $or: [{ email: newUser.email }, { phone: newUser.phone }] })

        if(checkEntry){
            throw("user already exits ! change phone or email !")
        }

        let entry = new newCustomer(newUser)         

        let result = await entry.save()

        res.status(202).json({ message:`${newUser.name} ! has been registred successfully !`})

    } catch (err) {
        console.log("unable to register a user !", err)
    }
}

export { userRegisteration }