import express from "express"

import { userLogin, userRegisteration, clientDashboard } from "../controllers/controller.js"
import { authUser } from "../middleware/Auth.js"

let router = express()

router.post("/user/registration", userRegisteration)
router.post("/user/login", userLogin)

// 

router.get("/user/dashboard", authUser, clientDashboard)


export { router }