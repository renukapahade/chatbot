const message = require('../../db/models/message');
var Message = require('../../db/models/message');

function getCompletionRate(req, res) {

    //Get the completion rate of sessions
    Message.aggregate([
        {
            "$group": {
                _id: '$session_id',
                "matchedCount": {
                    "$sum": {
                        "$cond": {
                            "if": {
                                "$ne": [
                                    {
                                        "$regexFind": {
                                            "input": "$message",
                                            "regex": /no/i
                                        }
                                    },
                                    null
                                ]
                            },
                            "then": 1,
                            "else": 0
                        }
                    },
                },
            },
        },
    ]).then(messages => {
        totalCount = messages.length;
        completionCount = 0;
        for (const index in messages) {
            var message = messages[index];
            if (message.matchedCount == 1) {
                completionCount += 1;
            }
        }
        percentage = Math.round((completionCount / totalCount) * 100);

        res.send({ "completionRate": percentage + '%' });
    });

}

module.exports = getCompletionRate