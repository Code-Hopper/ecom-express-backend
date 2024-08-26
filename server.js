import dotenv from "dotenv"
import express from "express"
import "./database/conn.js"

import {router} from "./routers/router.js"

dotenv.config({ path: "./config.env" })

let app = express()

let port = process.env.port || 5501

app.use(express.json())

app.use(router)

app.listen(port,()=>{
    console.log(`server is running on port ${port} , http://localhost:${port} ! `)
})