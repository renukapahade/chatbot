var router = require('express').Router()
var getEngagementRate = require('./engagement')
var getDropoutRate = require('./dropout')
var getCompletionRate = require('./completion')


//Get the session statistics
router.get('/users/stats/engagement', getEngagementRate)
router.get('/users/stats/dropout', getDropoutRate)
router.get('/users/stats/completion', getCompletionRate)

module.exports = router;