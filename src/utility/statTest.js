const mongoose = require('../db/mongoose')
const GameLevel = require('../models/gameLevel')
const Patient = require('../models/patients')
const SubModule = require('../models/subModules')
const Word = require('../models/words')
const Session = require('../models/session')
const Scores = require('../models/score')
const { ObjectId } = require('mongodb');
var wordList = []
var wordIdArr = []
var finalWordList = []
stats_Sessions = async (patientId) => {
    try {
        counter = 0
        subject = await Patient.findOne({ patientId }).select('-tokens').populate({
            path: 'sessions',
            populate: {
                path: 'scores'
            }
        })
        subjectSessions = await subject.toObject({ virtuals: true }).sessions
        return subjectSessions
    } catch (error) {
        console.log(error)
    }
}

computeSession = async (subjectSessions) => {
    for (i = 0; i < subjectSessions.length; i++) {
        if (subjectSessions[i].scores.length != 0) {
            individualSessionScores = subjectSessions[i].scores
            // console.log(individualSessionScores.length)
            for (j = 0; j < individualSessionScores.length; j++) {
                wordIdArr.push(individualSessionScores[j].wordId)
            }
        }
    }
    return wordIdArr
}

findWordDs = async (wordIdArr) => {
    for (i = 0; i < wordIdArr.length; i++) {
        wordDetails = await Word.findOne({ '_id': wordIdArr[i] })
        wordList.push(wordDetails.word)
    }
    return wordList
}

countUniqueWords = async (wordList) => {
    console.log("Size of total completed wordlist is ", wordList.length)
    wordList.forEach(word => {
        if (finalWordList.includes(word)) {
            console.log("Duplicate Entry found for ", word)
        } else {
            console.log("Entering word ", word)
            finalWordList.push(word)
        }
    });
    return finalWordList
}

// Function call area
uniqueWordList = stats_Sessions(patientId = "SLD23").then((subjectSessions) => {
    computeSession(subjectSessions).then((wordIdArr) => {
        findWordDs(wordIdArr).then((wordList) => {
            countUniqueWords(wordList).then((finalWordList) => {
                console.log("Size of final list is ", finalWordList.length)
            })
        })
    })
})

