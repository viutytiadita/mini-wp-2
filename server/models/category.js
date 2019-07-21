const mongoose = require('mongoose')

let Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{timestamps : true})


const Category = mongoose.model('Category',categorySchema)

module.exports = Category