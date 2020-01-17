const {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss_promised');

const printPassTimes = function(str) {
  for (const time of str) {
    console.log(
      `Next pass at ${Date(time.riseTime)} for ${time.duration} seconds!`
    );
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.log('ERROR', error.message);
  });
