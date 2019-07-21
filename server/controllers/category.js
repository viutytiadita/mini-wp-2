const Category = require('../models/category')

class CategoryController{
    static findAll(req,res,next){
        Category.find()
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOneCategory(req,res,next){
        Category.find({
            name: req.params.name
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = CategoryController