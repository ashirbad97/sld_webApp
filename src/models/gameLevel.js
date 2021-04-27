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

gameLevelSchema.statics.findLevelOne = async()=>{
    const levelOne = GameLevel.findOne({levelId:1})
    return levelOne
}

const GameLevel = mongoose.model('GameLevel', gameLevelSchema)
module.exports = GameLevel