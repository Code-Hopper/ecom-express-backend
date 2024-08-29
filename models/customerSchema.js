import mongoose from "mongoose";
import bcrypt from "bcrypt"

let customer = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    city: {
        type: String
    },
    dob: {
        type: Date
    },
    timestamp: {
        type: String
    },
    token: {
        type: String
    },
    password: {
        type: String
    }
})

customer.pre("save", async function () {

    try {

        console.log('this is pre method called')
        let date = new Date()
        this.timestamp = `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`

        // encrypt the the user password

        console.log("normal password is", this.password)

        let salt = await bcrypt.genSalt(10)

        console.log(salt)

        let hash = await bcrypt.hash(this.password, salt)

        this.password = hash

    } catch (err) {
        console.log("error in pre method", err)
    }

})

let newCustomer = new mongoose.model("customers", customer)

export { newCustomer }