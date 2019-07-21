const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const articleRouter = require('./article')
const tagRouter = require('./tag')
const cateRouter = require('./category')

router.use('/users',userRouter)
router.use('/articles', articleRouter)
router.use('/tags', tagRouter)
router.use('/categories', cateRouter)

module.exports = router