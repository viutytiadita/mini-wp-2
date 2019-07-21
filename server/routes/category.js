const express = require('express')
const cateRouter = express.Router()
const CategoryController = require('../controllers/category')

cateRouter.get('/all',CategoryController.findAll)
cateRouter.get('/one/:name',CategoryController.findOneCategory)

module.exports = cateRouter