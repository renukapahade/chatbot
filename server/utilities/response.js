const weather = require('./weather');

//Chatbot logic - to be replaced by AI models (Diaglogflow/Rasa etc)
var chatResponse = (message) => {
    return new Promise(async (resolve, reject) => {
        switch (message) {
            case (message.match(/hello/) || {}).input:
            case (message.match(/hi/) || {}).input:
                responseMessage = "Hi, how can I help you?";
                sessionEnd = false;
                resolve({ responseMessage, sessionEnd });
                break;
            case (message.match(/balance/) || {}).input:
            case (message.match(/account/) || {}).input:
            case (message.match(/savings/) || {}).input:
            case (message.match(/bank/) || {}).input:
            case (message.match(/check/) || {}).input:
                responseMessage = "Sure, you have R2000 in your account. Can I help you with anything else?";
                sessionEnd = false;
                resolve({ responseMessage, sessionEnd });
                break;
            case (message.match(/no/) || {}).input:
            case (message.match(/thanks/) || {}).input:
            case (message.match(/thank you/) || {}).input:
                responseMessage = "Great, Come back soon!";
                sessionEnd = true;
                resolve({ responseMessage, sessionEnd });
                break;
            case (message.match(/weather/) || {}).input:
            case (message.match(/climate/) || {}).input:
            case (message.match(/humidity/) || {}).input:
            case (message.match(/temperature/) || {}).input:
                sessionEnd = false;
                resolve({ responseMessage: getWeatherResponseMessage(await weather(message)), sessionEnd });
                break;
            default:
                responseMessage = "Sorry, I didn't catch that!";
                sessionEnd = false;
                resolve({ responseMessage, sessionEnd });
        }
    });
}


const getWeatherResponseMessage = (reports) => {
    let msg = ''
    reports.forEach(element => {
        if(element.temperature) {
            msg += `Temperature of ${element.name} is ${element.temperature}. It's ${element.description} there in ${element.name}.
            Humidity is ${element.humidity}.
            Speed of wind is ${element.wind_speed}${(element.wind_speed > 20 ? ', Please be careful!': '.')}\n`
        } else {
            msg += `Weather report for ${element.name} cannot be fetched.\n`
        }
        
    });
    return msg;
}

module.exports = chatResponse;