const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Patient'
    },
    allocatedStartTime:{
        type:String,
        required:true
    },
    status:{
        type:Boolean
    }
})

sessionSchema.statics.generateSession = async (patientId)=>{
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
const Session = mongoose.model('Session',sessionSchema)
module.exports = Session