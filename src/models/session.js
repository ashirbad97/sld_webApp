const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    allocatedStartTime: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
})

sessionSchema.virtual('scores', {
    ref: 'Score',
    localField: '_id',
    foreignField: 'sessionId'
})
// As virtual fields don't show up in the output by default they are to be specified to be used
sessionSchema.set('toObject', { virtuals: true });
sessionSchema.set('toJSON', { virtuals: true });
sessionSchema.statics.generateSession = async (patientId) => {
    try {
        allocatedStartTime = new Date();
        var session = new Session({
            patientId,
            allocatedStartTime
        })
        sessionId = await session.save()
        return sessionId._id
    } catch (error) {
        console.log(error)
    }
}
const Session = mongoose.model('Session', sessionSchema)
module.exports = Session