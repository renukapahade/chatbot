const pos = require('pos');
const http = require('http');

/**
 * Function for extracting place/s from the query string and getting weather information for the place/s.
 * @param {String} weatherQuery User query string for weather information.
 */
const getWeather = (weatherQuery) => {
    return new Promise((resolve, reject) => {
        const weatherReport = [];
        //  Processing the string for identifying sentence parts
        var words = new pos.Lexer().lex(weatherQuery);
        var tags = new pos.Tagger()
            .tag(words)
            .map(function (tag) { return tag[0] + '/' + tag[1]; })
            .join(' ');
        
        //  Extracting places
        const probablePlaces = tags.split(' ')
            .filter(word => (word.includes('NN') || word.includes('NNP') || word.includes('JJ')))
            .map(ele => {
                const place = ele.split('/')[0];
                const placeInLowerCase = place.toLocaleLowerCase();
                if (
                    placeInLowerCase !== 'weather' &&
                    placeInLowerCase !== 'climate' &&
                    placeInLowerCase !== 'humidity' &&
                    placeInLowerCase !== 'temperature'
                )
                    return place;
            });

        probablePlaces.forEach(city => {
            if (city) {
                weatherReport.push(weatherAPI(city));
            }
        });

        Promise.all(weatherReport).then(allCitiesData => {
            resolve(allCitiesData);
        });
    })
}

/**
 * Function for calling weather API to get weather information.
 * @param {String} city Place of which weather to be fetched.
 */
const weatherAPI = (city) => {
    return new Promise((resolve, reject) => {
        http.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_ACCESS_KEY}&query=${city}`, (res) => {
            let dataString = ''
            res.on('data', (data) => {
                dataString += data;
            });

            res.on('end', async () => {
                const cityReport = JSON.parse(dataString);
                const finalReport = {};
                if (cityReport.location) {
                    finalReport.name = cityReport.location.name;
                    finalReport.temperature = cityReport.current.temperature;
                    finalReport.description = cityReport.current.weather_descriptions[0];
                    finalReport.wind_speed = cityReport.current.wind_speed;
                    finalReport.humidity = cityReport.current.humidity;
                    resolve(finalReport);
                } else {
                    finalReport.name = city;
                    finalReport.temperature = undefined;
                    finalReport.description = undefined;
                    finalReport.wind_speed = undefined;
                    finalReport.humidity = undefined;
                    resolve(finalReport);
                }
            });
        }).on('error', (err) => {
            console.log('Something went wrong: ', err.message);
        });
    });
    
}

module.exports = getWeather;