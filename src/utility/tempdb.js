const mongoose = require('../db/mongoose')
const GameLevel = require('../models/gameLevel')
const Patient = require('../models/patients')

addGameLevel = async(i)=>{
    try {
        moduleName = 'Module_'+i
        const gameLevel = new GameLevel({
            levelId:i,
            levelName:moduleName
        })
        await gameLevel.save()
    } catch (error) {
        console.log(error)
    }
}
// addGameLevel()
showAllPatients = async()=>{
    try {
        const patients = await Patient.find()
        console.log(patients)
    } catch (error) {
        console.log(error)
    }
}
// showAllPatients()
