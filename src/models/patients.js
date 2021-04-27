const mongoose = require('mongoose')
const validator = require('validator')
const passGenerator = require('generate-password')
const jwt = require('jsonwebtoken')

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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
//This function runs before we do any save to this schema, the purpose of this pre hook is to ensure that each new patient created has a password generated 
// themselves but had a bug if changing the password every time anu other save is made therefore added a condition to check if the password is already present
patientSchema.pre('validate', async function (next) {
    try {
        const patient = this
        if(!patient.password)
        {
            console.log('Creating Password')
            const password = passGenerator.generate({
                length: 6,
                numbers: false,
                uppercase: false
            })
            patient.password = password
        }
        else{
            console.log("Password Already Exists")
        }
        next()
    } catch (error) {
        console.log(error)
    }

})
patientSchema.statics.authenticateuser = async (username, password) => {
    const patient = await Patient.findOne({ patientId: username })
    if (!patient) {
        throw new Error('No such user found')
    }

    if (!(patient.password === password)) {
        throw new Error('Wrong Password')
    }
    return patient
}
patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString() }, 'thisissecretkey', { expiresIn: "20 hours" })
    patient.tokens = patient.tokens.concat({ token })
    await patient.save()
    return token
}
patientSchema.statics.findPatientDetailsfromToken = async () => {
    try{
        const patient = await Patient.findOne({ _id: decoded._id,'tokens.token':token })
        return patient
    }
    catch(error){
        console.log(error)
    }
}
const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient