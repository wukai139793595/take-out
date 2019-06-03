export function getPosition() {
  return new Promise((resolve, reject) => {
    var data = {};
    window.navigator.geolocation.getCurrentPosition(function (pos) {
      data.longtitude = pos.coords.longitude;
      data.latitude = pos.coords.latitude;
      resolve(data)
    }, function (err) {
      reject(err);
    })
  })
}
