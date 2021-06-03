const mongoose = require('mongoose')
const validator = require('validator')
const passGenerator = require('generate-password')
const jwt = require('jsonwebtoken')

const GameLevel = require('../models/gameLevel')

const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    schoolStandard: {
        type: String,
        trim: true
    },
    interventionDate: {
        type: Date,
        required: true,
        trim: true
    },
    scores: {
        glad: {
            type: Number,
            trim: true
        },
        ctopp2: {
            type: Number,
            trim: true
        },
        wrat5: {
            type: Number,
            trim: true
        }
    },
    fmriFindings: {
        type: String,
        trim: true
    },
    additionalData: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    currentLevel:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'GameLevel',
        default:null
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

patientSchema.virtual('noOfsessions',{
    ref:'Session',
    localField:'_id',
    foreignField:'patientId',
    count: true
})
// As virtual fields don't show up in the output by default they are to be specified to be used
patientSchema.set('toObject', { virtuals: true });
patientSchema.set('toJSON', { virtuals: true });

//This function runs before we do any save to this schema, the purpose of this pre hook is to ensure that each new patient created has a password generated 
// themselves but had a bug if changing the password every time anu other save is made therefore added a condition to check if the password is already present
patientSchema.pre('validate', async function (next) {
    try {
        const patient = this
        if(!patient.password)
        {
            // console.log('Creating Password')
            const password = passGenerator.generate({
                length: 6,
                numbers: false,
                uppercase: false
            })
            patient.password = password
        }
        else{
            // console.log("Password Already Exists")
        }
        next()
    } catch (error) {
        console.log(error)
    }
})

patientSchema.statics.authenticateuser = async (username, password) => {
    const patient = await Patient.findOne({ patientId: username }).populate("noOfsessions")
    await patient.populate("currentLevel","levelId").execPopulate()
    if (!patient) {
        throw new Error('No such user found')
    }

    if (!(patient.password === password)) {
        throw new Error('Wrong Password')
    }
    return patient
}
patientSchema.statics.findPatientDetailsfromToken = async (decoded,token) => {
    try{
        var patient = await Patient.findOne({ _id: decoded._id,'tokens.token':token }).populate("noOfsessions")
        await patient.populate("currentLevel","levelId").execPopulate()
        return patient
    }
    catch(error){
        console.log(error)
    }
}


patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString() }, 'thisissecretkey', { expiresIn: "20 hours" })
    patient.tokens = patient.tokens.concat({ token })
    await patient.save()
    return token
}
//Function to remove the additional fields while passing the patient data into the hbs 
patientSchema.methods.trimPatientData = async function () {
    var patient = this
    patient = patient.toObject()
    delete patient.tokens
    delete patient.gender
    delete patient.fmriFindings
    delete patient.additionalData
    delete patient.password
    delete patient.scores
    delete patient.schoolStandard
    patient.totalDurationPlayed = patient.noOfsessions * 5
    return patient
}

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient