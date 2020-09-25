var Message = require('../../models/message');

function getDropoutRate(req, res) {

    //Get the dropout rate of sessions
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
        percentage = Math.round(((totalCount - completionCount) / totalCount) * 100);

        res.send({ "dropoutRate": percentage + '%' });
    });
}

module.exports = getDropoutRate