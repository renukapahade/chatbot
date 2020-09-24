var crypto = require('crypto');

function createSession(req, res) {
    //using a random hash to create a chat session
    session_id = crypto.randomBytes(16).toString('base64');
    res.send({ session_id: session_id });
}

module.exports = createSession