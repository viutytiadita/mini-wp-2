const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/user')

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.post('/tokensignin',UserController.signInWithGoogle)

module.exports = userRouter