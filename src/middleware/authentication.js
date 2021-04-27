const jwt = require('jsonwebtoken')
const Patient = require('../models/patients')

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.auth_token
        const decoded = jwt.verify(token,'thisissecretkey')
        var patient = await Patient.findPatientDetailsfromToken(decoded,token)
        if(!patient){
            throw new Error()
        }
        patient = await patient.trimPatientData()
        req.patient = patient
        next()
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}
module.exports = auth