import moongose from "mongoose"

import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config({ path: "./config.env" })

async function connection() {
    try {
       await mongoose.connect(process.env.mongodbstring)
       console.log(`connection with database was successfull !`)
    } catch (err) {
        console.log(`unable to connect with database `, err)
    }

}

connection()