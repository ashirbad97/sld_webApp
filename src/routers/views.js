const express = require('express')
const router = new express.Router()
const Patient = require('../models/patients')
const auth = require('../middleware/authentication')



router.get('/',auth, async (req, res) => {
    try {
        patient = req.patient
        res.render('gameHome',{patient})
    } catch (e) {
        console.log(e)
    }

})

router.get('/login',(req, res) => {
    res.render('login')
})

router.get('/subModuleHolder', async (req, res) => {

    try {
        res.render('subModuleHolder')
    } catch (e) {
        console.log(e)
    }

})
router.get('/individualModule', async (req, res) => {

    try {
        res.render('individualModuleHome')
    } catch (e) {
        console.log(e)
    }

})

router.post('/addPatientFormData', async (req, res) => {
    try {
        // console.log(req.body)
        const patient = new Patient({
            ...req.body,
        })
        await patient.save()
        credentials = await Patient.findOne({patientId:req.body.patientId}).select('patientId password')
        console.log(credentials)
        res.status(200).send(credentials)
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        res.status(200)
        var patient = await Patient.authenticateuser(req.body.username,req.body.password)
        const token = await patient.generateAuthToken()
        patient = await patient.trimPatientData()
        if(!token){
            throw error()
        }
        res.cookie('auth_token',token).render('gamehome',{patient})
    } catch (e) {
        console.log(e)
        res.render('login',{e})
    }
})

module.exports = router