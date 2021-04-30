const mongoose = require('mongoose')


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

subModuleSchema.virtual('words',{
    ref:'Word',
    localField:'_id',
    foreignField:'parentSubModule'
})

subModuleSchema.statics.findWords = async(subModuleId)=>{
    try {
        const words = await SubModule.findOne({subModuleId}).populate("words")
        return words.words
    } catch (error) {
        console.log(error)
    }
}
subModuleSchema.statics.findsubModuleName = async(subModuleId)=>{
    try {
        const subModuleName = await SubModule.findOne({subModuleId}).select('subModuleName')
        return subModuleName.subModuleName
    } catch (error) {
        console.log(error)
    }
}

const SubModule = mongoose.model('SubModule',subModuleSchema)
module.exports = SubModule