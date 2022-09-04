const request = require("request");

const forcast = (latitude, longitude, callback) => {
  // https://weatherstack.com/usage
  const weatherURL = `http://api.weatherstack.com/current?access_key=099cc7c5532ee37ca61b2cf09e780385&query=${encodeURI(
    latitude
  )},${encodeURI(longitude)}&units=m`;

  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      const errorMessage = "Unable to connect to the weather service";
      callback(errorMessage, undefined);
    } else if (response.body.error) {
      const errorMessage =
        "Unable to find forecast, please try out another set of latitude and longitude";
      callback(errorMessage, undefined);
    } else {
      const data = response.body.current;
      const dataString = `${data.weather_descriptions[0]}. It is ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. Great!!`;
      callback(undefined, dataString);
    }
  });
};

module.exports = forcast;
