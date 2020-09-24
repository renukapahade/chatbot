var router = require('express').Router()
var createSession = require('./session')

//Get the user's account details
router.get('/users/session', createSession)

module.exports = router;