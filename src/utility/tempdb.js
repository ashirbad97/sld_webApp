const mongoose = require('../db/mongoose')
const GameLevel = require('../models/gameLevel')
const Patient = require('../models/patients')
const SubModule = require('../models/subModules')

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

entrySubModules = async () => {
    try {
        subModuleName = ['s','a','t','i','p','n','k','e','h','r','m','d','g','o','u','l','ul','f','b','j','y','ai','w','oa','igh','ee','or','z','ng','ngk','v','oo','ks','gz','ch','sh','th','th','kw','oi','yoo','er','ar','air','eer','zh']
        subModuleId = 1
        // console.log(subModuleName.length)
        for(i=0;i<subModuleName.length;i++)
        {
            value = subModuleId+"."+(i+1)
            value = parseFloat(value)
            // console.log(value)
            // console.log(subModuleName[i])
            const gameLevel = await GameLevel.findOne({ 'levelId': 1 })
            const subModule = new SubModule({
                mainModule : gameLevel._id,
                subModuleId : value,
                subModuleName : subModuleName[i]
            })
            await subModule.save()
        }
    }
    catch (error) {
        console.log(error)
    }
}
// entrySubModules()