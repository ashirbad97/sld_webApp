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
    const levelOne = await GameLevel.findOne({levelId:1})
    return levelOne
}

gameLevelSchema.virtual('subModules',{
    ref:'SubModule',
    localField:'_id',
    foreignField:'mainModule'
})

gameLevelSchema.statics.listSubModuleName = async(moduleLevel)=>{
    subModuleList = await GameLevel.findOne({'levelId':moduleLevel}).populate("subModules")
    return subModuleList.subModules
}

const GameLevel = mongoose.model('GameLevel', gameLevelSchema)
module.exports = GameLevel