const mongoose = require('mongoose')

const gameLevelSchema = new mongoose.Schema({
    levelId:{
        type:Number,
        required:true
    },
    levelName:{
        type:String,
        required:true
    }
})