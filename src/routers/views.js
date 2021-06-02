const express = require('express')
const router = new express.Router()
const Patient = require('../models/patients')
const auth = require('../middleware/authentication')
const GameLevel = require('../models/gameLevel')
const SubModule = require('../models/subModules')
const Word = require('../models/words')
const Session = require('../models/session')
const Score = require('../models/score')

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

router.get('/level/:level',auth,async(req,res)=>{
    try { 
        gameLevel = req.params.level
        subModulesList = await GameLevel.listSubModuleName(gameLevel)
        res.render('subModuleHolder',{subModulesList,gameLevel})
    } catch (error) {
        console.log(error)
    }
})

router.get('/level/:level/submodule/:submodule',auth,async(req,res)=>{
    try { 
        const wordList = await SubModule.findWords(req.params.submodule)
        const subModuleName = await SubModule.findsubModuleName(req.params.submodule)
        res.render('wordsHolder',{wordList,subModuleName})
    } catch (error) {
        console.log(error)
    }
})

router.post('/generateSession',auth,async(req,res)=>{
    try {
        const sessionDetails = await Session.generateSession(req.patient._id)
        res.send(sessionDetails)
    } catch (error) {
        console.log(error)
    }
})

router.post('/addPatientFormData', async (req, res) => {
    try {
        currentLevel = await GameLevel.findLevelOne()
        currentLevel = currentLevel._id
        const patient = new Patient({
            ...req.body,
            currentLevel
        })
        await patient.save()
        credentials = await Patient.findOne({patientId:req.body.patientId}).select('patientId password')
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
        res.cookie('auth_token',token).render('gameHome',{patient})
    } catch (e) {
        console.log(e)
        res.render('login',{e})
    }
})
// Move this to another router after more functions
router.post('/api/score', async (req, res) => {
    try {
        await Score.saveScore(req.body)
        res.status(200).send("Score Received")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error saving the scores")
    }
})

module.exports = router