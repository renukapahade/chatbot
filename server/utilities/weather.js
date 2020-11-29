const pos = require('pos');
const http = require('http');

const getWeather = (weatherQuery) => {
    return new Promise((resolve, reject) => {
        const weatherReport = [];
        var words = new pos.Lexer().lex(weatherQuery);
        var tags = new pos.Tagger()
            .tag(words)
            .map(function (tag) { return tag[0] + '/' + tag[1]; })
            .join(' ');
    
        const probablePlaces = tags.split(' ')
            .filter(word => (word.includes('NN') || word.includes('NNP')))
            .map(ele => {
                const place = ele.split('/')[0]
                if (place.toLocaleLowerCase() !== 'weather')
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
                finalReport.name = cityReport.location.name;
                finalReport.temperature = cityReport.current.temperature;
                finalReport.description = cityReport.current.weather_descriptions[0];
                finalReport.wind_speed = cityReport.current.wind_speed;
                finalReport.humidity = cityReport.current.humidity;
                resolve(finalReport);
            });
        }).on('error', (err) => {
            console.log('Something went wrong: ', err.message);
        });
    });
    
}

module.exports = getWeather;