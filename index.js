// const { fetchMyIp } = require('./iss');
// const { fetchCoordsByIp } = require('./iss');
const {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("it didn't work!", error);
//     return;
//   }

//   console.log('it worked! Returned Ip: ', ip);
// });

// fetchCoordsByIp('216.232.90', (error, data) => {
//   if (error) {
//     console.log("it didn't work!", error);
//     return;
//   }

//   // console.log('Latitude: ', data.latitude);
//   // console.log('longitude: ', data.longitude);
//   console.log(data);
// });

// fetchISSFlyOverTimes(
//   { latitude: '43.63190', longitude: '-79.37160' },
//   (error, flyOverTimes) => {
//     if (error) {
//       console.log("it didn't work!", error);
//       return;
//     }

//     console.log('it worked! FlyOver Times: ', flyOverTimes);
//   }
// );

nextISSTimesForMyLocation((error, flyTimes) => {
  if (error) {
    return console.log('Something went wrong!', error);
  }

  console.log(flyTimes);
});
