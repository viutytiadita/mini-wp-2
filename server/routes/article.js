const express = require('express')
const articleRouter = express.Router()
const ArticleController = require('../controllers/article')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const imageUpload = require('../middlewares/imageUpload')

articleRouter.get('/all',ArticleController.showList)
articleRouter.get('/find',ArticleController.findTag)
articleRouter.get('/category/:id',ArticleController.findCategory)
articleRouter.get('/title/:title',ArticleController.findByTitle)
articleRouter.get('/detail/:articleid',ArticleController.findOneArticle)
articleRouter.use(authentication)
articleRouter.get('/my',ArticleController.findMine)
articleRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ArticleController.create)
articleRouter.patch('/pic/:articleid',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ArticleController.updatePic)
articleRouter.patch('/tag/:articleid',ArticleController.updateTags)
articleRouter.patch('/deletetag/:articleid',ArticleController.deleteTags)
articleRouter.use("/:articleid", authorization)
articleRouter.delete('/:articleid', ArticleController.delete)
articleRouter.put('/:articleid', ArticleController.update)


module.exports = articleRouter