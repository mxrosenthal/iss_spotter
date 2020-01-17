const request = require('request-promise-native');

// const fakeLatLongData = {
//   ip: '216.232.132.90',
//   city: 'Victoria',
//   region: 'British Columbia',
//   region_code: 'BC',
//   country: 'CA',
//   country_code: 'CA',
//   country_code_iso3: 'CAN',
//   country_capital: 'Ottawa',
//   country_tld: '.ca',
//   country_name: 'Canada',
//   continent_code: 'NA',
//   in_eu: false,
//   postal: 'V8S',
//   latitude: 48.42,
//   longitude: -123.3047,
//   timezone: 'America/Vancouver',
//   utc_offset: '-0800',
//   country_calling_code: '+1',
//   currency: 'CAD',
//   currency_name: 'Dollar',
//   languages: 'en-CA,fr-CA,iu',
//   country_area: 9984670.0,
//   country_population: 33679000.0,
//   asn: 'AS852',
//   org: 'TELUS Communications Inc.'
// };

const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(data) {
  let shape = JSON.parse(data);
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${shape.data.latitude}&lon=${shape.data.longitude}`
  );
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
