var router = require('express').Router()
var userAccount = require('./user')

//Get the user's account details
router.post('/users/account', userAccount)

module.exports = router;