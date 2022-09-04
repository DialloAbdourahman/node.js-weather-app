const request = require("request");

const geocode = (address, callback) => {
  // https://positionstack.com/quickstart
  const positionStackURL = `http://api.positionstack.com/v1/forward?access_key=ec35ed9b1e2f00c478d9f5c3bf57ef5e&limit=1&query=${encodeURIComponent(
    address
  )}`;

  request({ url: positionStackURL, json: true }, (error, response) => {
    if (error) {
      // this is for low level error like os error or network errors. here, the error will be true and the response will be false
      const errorMessage = "Unable to connect to the location service";
      callback(errorMessage, undefined);
    } else if (response.body.error) {
      // this is to handle an error that may occure during the data fetching but we still get a response
      const errorMessage = "Unable to find location. Try another search";
      callback(errorMessage, undefined);
    } else {
      const latitude = response.body.data[0].latitude;
      const longitude = response.body.data[0].longitude;
      const label = response.body.data[0].label;

      callback(undefined, { longitude, latitude, location: label });
    }
  });
};

module.exports = geocode;
