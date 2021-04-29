const express = require('express')
const router = new express.Router()
const Patient = require('../models/patients')
const auth = require('../middleware/authentication')
const GameLevel = require('../models/gameLevel')
const SubModule = require('../models/subModules')


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

router.get('/level?:id',async(req,res)=>{
    try { 
        subModulesList = await GameLevel.listSubModuleName(req.params.id)
        res.render('subModuleHolder',{subModulesList})
    } catch (error) {
        console.log(error)
    }
})

router.post('/addPatientFormData', async (req, res) => {
    try {
        // console.log(JSON.stringify(req.body))
        currentLevel = await GameLevel.findLevelOne()
        currentLevel = currentLevel._id

        const patient = new Patient({
            ...req.body,
            currentLevel
        })
        await patient.save()
        credentials = await Patient.findOne({patientId:req.body.patientId}).select('patientId password')
        // console.log(credentials)
        res.status(200).send(credentials)
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
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