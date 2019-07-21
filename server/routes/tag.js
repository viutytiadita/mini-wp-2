const express = require('express')
const tagRouter = express.Router()
const TagController = require('../controllers/tag')

tagRouter.post('/',TagController.create)
tagRouter.get('/',TagController.findAll)
tagRouter.get('/:name',TagController.findOneTag)

module.exports = tagRouter