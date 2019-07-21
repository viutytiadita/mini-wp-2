const Article = require('../models/article')

class ArticleController {
    static showList(req, res, next) {
        Article.find().populate('user_id').populate('category_id').sort({ createdAt: -1 })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findByTitle(req, res, next) {
        Article.find({ title: { $regex: req.params.title, $options: 'i' } }).populate('user_id').populate('category_id').sort({ createdAt: -1 })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findMine(req, res, next) {
        console.log(req.decoded.id);

        Article.find({ user_id: req.decoded.id }).populate('user_id').populate('category_id').sort({ createdAt: -1 })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)

    }

    static findTag(req, res, next) {
        Article.find({ tags: req.query.tag }).populate('user_id').populate('category_id').sort({ createdAt: -1 })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)

    }

    static findCategory(req,res,next){
        Article.find({category_id : req.params.id}).populate('user_id').populate('category_id').sort({ createdAt: -1 })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(next)

    }

    static create(req, res, next) {
        Article.create({
            title: req.body.title,
            content: req.body.content,
            picture: req.file.cloudStoragePublicUrl,
            user_id: req.decoded.id,
            category_id: req.body.category,
        })
            .then(function (newarticle) {
                res.status(201).json(newarticle)
            })
            .catch(next)
    }

    static updateTags(req, res, next) {
        console.log('masuktags');
        console.log(req.body.tag);

        req.body.tag.forEach(tag => {
            // tagsArr = new Promise((resolve, reject) => {
            Article.updateOne({
                _id: req.params.articleid
            }, {
                    $push: {
                        tags: tag
                    }
                })
                .then((data) => {
                    // resolve(data)
                    console.log(data);

                })
                .catch(err => {
                    // reject(err)
                })
            // })

        });
        res.status(200).json({ message: 'success' })


    }

    static deleteTags(req, res, next) {
        console.log('masuktagsdelete');
        console.log(req.body.tag);
        Article.updateOne({
            _id: req.params.articleid
        }, {
                $set: {
                    tags: []
                }
            })
            .then((data) => {
                res.status(200).json({ message: 'success' })

            })
            .catch(err => {
            })
    }

    static updatePic(req, res, next) {
        Article.findByIdAndUpdate({ _id: req.params.articleid }, { picture: req.file.cloudStoragePublicUrl }, { runValidators: true, new: true })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOneArticle(req, res, next) {
        console.log('masuk id');

        Article.findById({ _id: req.params.articleid })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static update(req, res, next) {
        console.log(req.body);

        Article.findByIdAndUpdate({ _id: req.params.articleid },
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.decoded.id,
                category_id: req.body.category
            }, { runValidators: true, new: true })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static delete(req, res, next) {
        Article.findByIdAndDelete({ _id: req.params.articleid })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

}

module.exports = ArticleController
