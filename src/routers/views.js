const express = require('express')
const router = new express.Router()
const Patient = require('../models/patients')

router.get('', async (req, res) => {

    try {
        res.render('gameHome')
    } catch (e) {
        console.log(e)
    }

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

router.get('/login',(req, res) => {
    res.render('login')
})

module.exports = router