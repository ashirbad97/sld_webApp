const express = require('express')
const router = new express.Router()

router.get('',async (req, res) => {
    
    try {
        res.render('gameHome')  
    } catch (e) {
        console.log(e)
    }
    
})
router.get('/testsubmodule',async (req, res) => {
    
    try {
        res.render('gameHome')  
    } catch (e) {
        console.log(e)
    }
    
})

module.exports = router