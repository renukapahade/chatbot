//Chatbot logic - to be replaced by AI models (Diaglogflow/Rasa etc)
var chatResponse = (message) => {
    switch (message) {
        case (message.match(/hello/) || {}).input:
        case (message.match(/hi/) || {}).input:
            responseMessage = "Hi, how can I help you?";
            sessionEnd = false;
            return { "responseMessage": responseMessage, "sessionEnd": sessionEnd };
            break;
        case (message.match(/balance/) || {}).input:
        case (message.match(/account/) || {}).input:
        case (message.match(/savings/) || {}).input:
        case (message.match(/bank/) || {}).input:
        case (message.match(/check/) || {}).input:
            responseMessage = "Sure, you have R2000 in your account. Can I help you with anything else?";
            sessionEnd = false;
            return { "responseMessage": responseMessage, "sessionEnd": sessionEnd };
            break;
        case (message.match(/no/) || {}).input:
        case (message.match(/thanks/) || {}).input:
        case (message.match(/thank you/) || {}).input:
            responseMessage = "Great, Come back soon!";
            sessionEnd = true;
            return { "responseMessage": responseMessage, "sessionEnd": sessionEnd };
            break;
        default:
            responseMessage = "Sorry, I didn't catch that!";
            sessionEnd = false;
            return { "responseMessage": responseMessage, "sessionEnd": sessionEnd };
    }
}

module.exports = chatResponse;