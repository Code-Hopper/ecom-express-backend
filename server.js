import dotenv from "dotenv"
import express from "express"

dotenv.config({ path: "./config.env" })

let app = express()

let port = process.env.port || 5501


app.listen(port,()=>{
    console.log(`server is running on port ${port} , http://localhost:${port} ! `)
})