const express = require('express')
const router = new express.Router()
const Patient = require('../models/patients')
const auth = require('../middleware/authentication')
const GameLevel = require('../models/gameLevel')
const SubModule = require('../models/subModules')
const Word = require('../models/words')

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
router.get('/wordsHolder', async (req, res) => {

    try {
        res.render('wordsHolder')
    } catch (e) {
        console.log(e)
    }

})

router.get('/level/:level',async(req,res)=>{
    try { 
        gameLevel = req.params.level
        subModulesList = await GameLevel.listSubModuleName(req.params.level)
        res.render('subModuleHolder',{subModulesList,gameLevel})
    } catch (error) {
        console.log(error)
    }
})

router.get('/level/:level/submodule/:submodule',async(req,res)=>{
    try { 
        const wordList = await SubModule.findWords(req.params.submodule)
        res.render('wordsHolder')
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