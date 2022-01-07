const mongoose = require('../db/mongoose')
const GameLevel = require('../models/gameLevel')
const Patient = require('../models/patients')
const SubModule = require('../models/subModules')
const Word = require('../models/words')
const Session = require('../models/session')
const Scores = require('../models/score')
const {ObjectId} = require('mongodb');

stats_Sessions = async(patientId)=>{
    try {
        uniqueWordList = []
        subject = await Patient.findOne({ patientId }).populate('noOfSessions').select('-tokens')
        await subject.populate("currentLevel","levelId").execPopulate()
        // console.log(subject)
        // Find Sessions with the patient
        patientSessions = await Session.find({patientId : subject.id})
        await patientSessions.forEach(async(session) => {
            // console.log(session._id)
            scores = await Scores.find({ sessionId : session._id })
            await scores.forEach(async(score)=>{
                // console.log(score.wordId)
                word = await Word.find({_id : score.wordId})
                wordName = word[0].word
                console.log(wordName)
                // if(wordName != null)
                // await uniqueWordList.push(wordName)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// Function call area
uniqueWordList = stats_Sessions(patientId = "SLD8")
