const mongoose = require('mongoose')
const GameLevel = require('../models/gameLevel')

const subModuleSchema = new mongoose.Schema({
    mainModule:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'GameLevel'
    },
    subModuleId:{
        type:String,
        required:true
    },
    subModuleName:{
        type:String,
        required:true
    }
})

const SubModule = mongoose.model('SubModule',subModuleSchema)
module.exports = SubModule