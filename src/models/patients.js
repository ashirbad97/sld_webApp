const mongoose = require('mongoose')
const validator = require('validator')
const passGenerator = require('generate-password')
const jwt = require('jsonwebtoken')

const patientSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    schoolStandard:{
        type:String,
        trim:true
    },
    interventionDate:{
        type:Date,
        required:true,
        trim:true
    },
    scores:{
        glad:{
            type:Number,
            trim:true
        },
        ctopp2:{
            type:Number,
            trim:true
        },
        wrat5:{
            type:Number,
            trim:true
        }
    },
    fmriFindings:{
        type:String,
        trim:true
    },
    additionalData:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})
patientSchema.pre('validate',async function(next) {
    // console.log('Creating Password')
    const patient = this
    const password = passGenerator.generate({
        length:6,
        numbers:false,
        uppercase:false
    })
    patient.password = password
    next()
})
patientSchema.statics.authenticateuser = async (username,password) => {
    const patient = await Patient.findOne({ patientId:username })
    if(!patient){
        throw new Error('No such user found')
    }

    if(!(patient.password === password)){
        throw new Error('Wrong Password')
    }
    return patient
}
patientSchema.methods.generateAuthToken = async function () { 
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString()},'thisissecretkey',{expiresIn:"20 hours"})
    patient.tokens = patient.tokens.concat({ token })
    await patient.save()
    return token
}
const Patient = mongoose.model('Patient',patientSchema)
module.exports = Patient