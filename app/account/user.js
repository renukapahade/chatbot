var Message = require('../../models/message');
var getChatResponse = require('../../response');

var userAccount = (req, res) => {
    message = req.body.message ? req.body.message : "";
    message = message.toLowerCase().trim();
    var chatResponse = getChatResponse(message);

    if (req.headers.session_id) {
        //Save the user message in DB
        var newMessage = new Message();
        newMessage.session_id = req.headers.session_id;
        newMessage.type = req.body.type;
        newMessage.message = req.body.message;
        newMessage.save(function (err) {
            if (err)
                throw err;
        });

        //Send the response back to the client
        res.send({ message: chatResponse.responseMessage, session_end: chatResponse.sessionEnd });
    } else {
        res.status(400).send({
            message: 'Session_id not received in the request'
        });
    }
}

module.exports = userAccount