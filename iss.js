const request = require('request');

const fakeLatLongData = {
  ip: '216.232.132.90',
  city: 'Victoria',
  region: 'British Columbia',
  region_code: 'BC',
  country: 'CA',
  country_code: 'CA',
  country_code_iso3: 'CAN',
  country_capital: 'Ottawa',
  country_tld: '.ca',
  country_name: 'Canada',
  continent_code: 'NA',
  in_eu: false,
  postal: 'V8S',
  latitude: 48.42,
  longitude: -123.3047,
  timezone: 'America/Vancouver',
  utc_offset: '-0800',
  country_calling_code: '+1',
  currency: 'CAD',
  currency_name: 'Dollar',
  languages: 'en-CA,fr-CA,iu',
  country_area: 9984670.0,
  country_population: 33679000.0,
  asn: 'AS852',
  org: 'TELUS Communications Inc.'
};

const fetchMyIp = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    //If error is null that means the url worked correctly and there were
    //no errors on the server side. So we then look for the breed
    if (error === null) {
      //if body returns and empty string, empty array or a string of an empty array
      //that means the breed doesn't exist on the api's database
      if (body.length === 0) {
        callback('oops, no ip...', null);
      } else if (body) {
        //if body is coerced to true, then the breed exists
        //so we parse the body into a variable data.
        const data = JSON.parse(body);
        let myIP = data.ip;

        //we then return and print the description.
        // return console.log('Breed description: ', data[0].description);

        // console.log('myIP: ', myIP);
        callback(null, myIP);
      }
      // console.log(6);

      //the else catches if there was an error and sends an allert
      //with the response code.
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request('https://ipvigilante.com/' + ip, function(error, response, body) {
    // request(`https://ipapi.co/${ip}/json/`, function(error, response, body) {
    console.log(body);
    console.log('statuscode: ', response.statusCode);
    if (error) callback('oops, to coodinates', null);
    if (response.statusCode !== 200) {
      if (response.statusCode === 400) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates because invalid IP. Response: ${body}`;

        callback(Error(msg), null);
        return;
      }
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    let latLong = {
      latitude: fakeLatLongData.latitude,
      longitude: fakeLatLongData.longitude
    };

    callback(null, latLong);
  });

  // let latLong = {
  //   latitude: fakeLatLongData.latitude,
  //   longitude: fakeLatLongData.longitude
  // };

  // callback(null, latLong);
};

const fetchISSFlyOverTimes = function(data, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`,
    function(error, response, body) {
      if (error) callback('oops, something went wrong with the URL', null);
      if (response.statusCode !== 200) {
        if (response.statusCode === 400) {
          const msg = `Status Code ${response.statusCode} when fetching coordinates because invalid lat/long. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const data = JSON.parse(body);
      console.log(data);
      let flyOver = data.response;
      console.log('flyOver: ', flyOver);
      callback(null, flyOver);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  // console.log('nextISSTimesForMyLocation');
  fetchMyIp((err, ip) => {
    // console.log('err at the bottome: ', err);
    // console.log('ip at the bottom: ', ip);

    fetchCoordsByIp(ip, (err, coords) => {
      // console.log('ip at the bottom in fetch: ', ip);
      // console.log('coords: ', coords);
      // console.log('err: ', err);

      fetchISSFlyOverTimes(coords, (err, flyTimes) => {
        // console.log('coords: ', coords);
        // console.log('err in fetchISS: ', err);
        // console.log('latLong: ', latLong);

        callback(null, flyTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
