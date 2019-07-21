const mongoose = require('mongoose')

let Schema = mongoose.Schema
const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{timestamps : true})


const Tag = mongoose.model('Tag',tagSchema)

module.exports = Tag