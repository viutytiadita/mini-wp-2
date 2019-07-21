const Tag = require('../models/tag')

class TagController{
    static create(req,res,next){
        Tag.create({
            name : req.body.name,
            $push: {
                articles: req.body.articleid
            }
        })
        .then(function(newdata){
            res.status(201).json(newdata)
        })
        .catch(next)
    }

    static findAll(req,res,next){
        Tag.find()
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOneTag(req,res,next){
        Tag.find({
            name : req.params.name
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = TagController