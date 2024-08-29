import express from "express"

import {userLogin, userRegisteration} from "../controllers/controller.js"

let router = express()

router.post("/user/registration",userRegisteration)
router.post("/user/login",userLogin)


export {router}