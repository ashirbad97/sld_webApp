const mongoose = require('mongoose')
const validator = require('validator')
const passGenerator = require('generate-password')

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

const Patient = mongoose.model('Patient',patientSchema)
module.exports = Patient