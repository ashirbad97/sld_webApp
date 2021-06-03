const mongoose = require('../db/mongoose')
const GameLevel = require('../models/gameLevel')
const Patient = require('../models/patients')
const SubModule = require('../models/subModules')
const Word = require('../models/words')
// const xlsxFile = require('read-excel-file/node');
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')

addGameLevel = async (i) => {
    try {
        moduleName = 'Module_' + i
        const gameLevel = new GameLevel({
            levelId: i,
            levelName: moduleName
        })
        await gameLevel.save()
    } catch (error) {
        console.log(error)
    }
}
// addGameLevel()
showAllPatients = async () => {
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

        // subModuleName = ['s','a','t','i','p','n','k','e','h','r','m','d','g','o','u','l','ul','f','b','j','y','ai','w','oa','igh','ee','or','z','ng','ngk','v','oo','ks','gz','ch','sh','th','th','kw','oi','yoo','er','ar','air','eer','zh']
        // subModuleName = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
        // subModuleName = ['cat','hat','bag','bed','boy','bat','bus','cap','cow','dog','fin','fox','hen','hay','pan','jet','key','map','mop','tea','pot','nut','pig','pin','sun','zoo','pen','toy']
        // subModuleName = ['a','e','i','o','u']
        // subModuleName = ['at','ab','ag','an','ad','ap','ay','as','am','ax','en','et','ed','eg','ea','ee','ib','ig','it','id','in','ip','ix','ox','od','on','ob','og','op','ub','ut','un','ug','us','up','ack','ass','ang','ame','ave','and','age','ake','ane','amp','ank','ent','ead','eed','ing','iss','ick','ive','ipe','ite','ink','ice','ide','ope','ose','ock','all','ill','ike','oke','uck']
        // subModuleName = ['1 Letter Words','2 Letter Words','3 Letter Words','4 Letter Words','5 Letter Words','5+ Letter Words']
        // subModuleName = ['pl','wh','tr','th','sw','st','sp','sn','sl','sh','pr','gr','fr','fl','dr','cr','ch','bl','ph','dis','im','in','mis','pre','re','un']
        subModuleName = ['nk', 'lk', 'nt', 'mp', 'ft', 'lt', 'lf', 'ld', 'st', 'rst', 'ng', 'ck', 'able', 'ful', 'less', 'ly', 'ment', 'ness']
        subModuleId = 8
        level = 'l8_'
        for (i = 0; i < subModuleName.length; i++) {
            value = level + (i + 1)
            const gameLevel = await GameLevel.findOne({ 'levelId': subModuleId })
            const subModule = new SubModule({
                mainModule: gameLevel._id,
                subModuleId: value,
                subModuleName: subModuleName[i]
            })
            await subModule.save()
        }
    }
    catch (error) {
        console.log(error)
    }
}

entryWords = async () => {
    try {
        subModuleId = 'l1_9'
        const subModule = await SubModule.findOne({ subModuleId })
        // wordList = ['City','House','Snake','Glass','Palace']
        // wordList = ['Add','Apple','Snap','Fan','Animal']
        // wordList = ['Ten','Teddy','Bat','Soft','Letter']
        // wordList = ['Iron','Nice','Insect','Cyanide','Science']
        // wordList = ['Pan','Puppet','Sheep','Lamp','Palace']
        // wordList = ['Net','Knot','Engine','Bonnet','Night']
        // wordList = ['Cat','Duck','Kit','Cheque','Chemist']
        // wordList = ['Egg','Head','Said','Elephant','Bread']
        // wordList = ['Hat','Hill','Hello','Hippo','Happy']
        wordList
        for (i = 0; i < wordList.length; i++) {
            const word = new Word({
                parentSubModule: subModule._id,
                word: wordList[i]
            })
            console.log(wordList[i])
            await word.save()
            console.log("Saved")
        }
    } catch (error) {
        console.log(error)
    }
}
// entryWords()

// const workbook = xlsx.readFile('Word_List.xlsx')
// console.log(workbook.SheetNames)
// worksheet = workbook.Sheets[workbook.SheetNames[0]]
// cell = 'Module1'

// console.log(worksheet[cell])

/////////////////////////////////////////////////////////////////////////
subModuleId = "l8"

renameSubModuleFileName = (subModuleId) => {
    audioDir = "../../public/assets/audio"
    audioPath = path.join(__dirname, audioDir)
    subModulePath = path.join(audioPath, subModuleId)

    fs.readdirSync(subModulePath).forEach(oldFileName => {
        newFileName = oldFileName.split("-")[1] + oldFileName.split("-")[2]
        oldFilePath = path.join(subModulePath, oldFileName)
        newFilePath = path.join(subModulePath, newFileName)

        fs.rename(oldFilePath, newFilePath, () => {
            console.log("FileRenamed")
        })
    })

}
// renameSubModuleFileName(subModuleId)

////////////////////////////////////////////////////////////////////////
wordExtendedDetails = async () => {
    try {
        word = await Word.find({'word':'City'})
        console.log(word)
    } catch (error) {
        console.log(error)
    }
}
// wordExtendedDetails()
////////////////////////////////////////////////////////////////////////