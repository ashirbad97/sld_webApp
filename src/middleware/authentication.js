const jwt = require('jsonwebtoken')
const Patient = require('../models/patients')

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.auth_token
        const decoded = jwt.verify(token,'thisissecretkey')
        const patient = await Patient.findOne({ _id: decoded._id,'tokens.token':token})
        if(!patient){
            throw new Error()
        }
        req.patient = patient
        next()
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}
module.exports = auth