import express from "express"

import {userRegisteration} from "../controllers/controller.js"

let router = express()

router.post("/user/registration",userRegisteration)


export {router}