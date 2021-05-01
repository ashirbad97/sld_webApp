const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Session',
        required:true
    },
    wordId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Word',
        required:true
    },
    attempt:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean
    }
})

scoreSchema.statics.saveScore = async(newScore)=>{
    score = new Score({
        ...newScore
    })
    await score.save()
}

const Score = mongoose.model('Score',scoreSchema)
module.exports = Score