const jwt = require('jsonwebtoken')
const Patient = require('../models/patients')

const auth = async (req,res,next)=>{
    try{
        // console.log(req)
        const token = req.cookies.auth_token
        // console.log(token)
        const decoded = jwt.verify(token,'thisissecretkey')
        const doctor = await Doctor.findOne({ _id: decoded._id,'tokens.token':token})
        // console.log(doctor)
        if(!doctor){
            throw new Error()
        }
        req.doctor = doctor
        next()
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}
module.exports = auth