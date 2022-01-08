const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
        required: true
    },
    attempt: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean
    }
})

scoreSchema.virtual('words', {
    ref: 'Word',
    localField: 'wordId',
    foreignField: '_id'
})
// As virtual fields don't show up in the output by default they are to be specified to be used
scoreSchema.set('toObject', { virtuals: true });
scoreSchema.set('toJSON', { virtuals: true });
scoreSchema.statics.saveScore = async (newScore) => {
    score = new Score({
        ...newScore
    })
    await score.save()
}

const Score = mongoose.model('Score', scoreSchema)
module.exports = Score