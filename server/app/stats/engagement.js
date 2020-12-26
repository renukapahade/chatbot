var Message = require('../../db/models/message');

function getEngagementRate(req, res) {

    //Get the average time spent on the chat sessions - grouped by the chat sessions
    Message.aggregate([
        {
            $sort:
            {
                timestamp: 1
            }
        },
        {
            "$group": {
                _id: '$session_id',
                oldest: {
                    "$first": "$createdAt"
                },
                latest: {
                    "$last": "$createdAt"
                },
            }
        },
        {
            "$project": {
                _id: 1,
                diffOfTime: { "$subtract": ["$latest", "$oldest"] }
            }
        },
        {
            "$group":
            {
                _id: null,
                avgTime: {
                    "$avg": "$diffOfTime"
                }
            }
        }
    ]).then(messages => {
        avgTimeInSecs = messages[0].avgTime / 1000;
        res.send({ "engagementRate": avgTimeInSecs + " seconds" });
    });

}

module.exports = getEngagementRate