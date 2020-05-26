require('dotenv').config();
const request = require('postman-request');

const weatherStackAccessKey = process.env.WEATHERSTACKACCESSKEY;

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherStackAccessKey + '&query=' + latitude + ',' + longitude + '&units=f';
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const {weather_descriptions, temperature } = body.current
            callback(undefined, 'It is currently ' + weather_descriptions[0] + 
            ' and ' + temperature + ' degrees outside.')
        }
    })
}

module.exports = forecast