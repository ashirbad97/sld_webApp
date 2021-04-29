const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    parentSubModule:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'SubModule',
    },
    word:{
        type:String,
        required:true,
        trim:true
    }
})

const Word = mongoose.model('Word', wordSchema)
module.exports = Word