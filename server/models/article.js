const mongoose = require('mongoose')

let Schema = mongoose.Schema
const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, `title is required`]
    },
    content: {
        type: String,
        required: [true, `content is required`]
    },
    picture: String,
    user_id: {type: Schema.
        Types.ObjectId, ref: 'User'},
    category_id: {type: Schema.Types.ObjectId, ref: 'Category'},
    tags : [{type: String}]
},{timestamps : true})


const Article = mongoose.model('Article',articleSchema)

module.exports = Article