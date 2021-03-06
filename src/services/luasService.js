import gpsDistance from 'gps-distance';
import {
  PermissionsAndroid,
  Platform
} from 'react-native';

class LuasService {

  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  fixShadeyLuasJson(json) {
    json.direction.forEach(dir => {
      if (!dir.tram) {
        dir.tram = [];
      } else if (!Array.isArray(dir.tram) && typeof dir.tram === 'object') {
        dir.tram = [dir.tram];
      }
    });
    return json;
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      const prerequisitePromises = [];
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        // need to ask for permission
        prerequisitePromises.push(
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Dublin Transit',
              'message': 'Dublin Transit needs your position to tell you about local transport options.'
            }
          ).catch(() => {
            console.log('Error getting location permissions');
          })
        );
      }
      Promise.all(prerequisitePromises).then(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        }, err => reject(err), {
          enableHighAccuracy: true
        });
      });
    });
  }

  getLuasStops () {
    return new Promise((resolve, reject) => {
      fetch(`${this.apiRoot}/luas/stops`)
        .then(resp => resp.json())
        .then(resp => resolve(resp))
        .catch(err => reject(err))
    });
  }

  getNearestLuasStop () {
    return new Promise((resolve) => {
      Promise.all([
        this.getCurrentLocation(),
        this.getLuasStops()
      ]).then(([position, stops]) => {
        let closestStop = stops.stations[0];
        let distanceToClosestStop = gpsDistance(
          position.coords.latitude, position.coords.longitude,
          closestStop.coordinates.latitude, closestStop.coordinates.longitude
        );
        for (let i=1; i < stops.stations.length; i++) {
          const stop = stops.stations[i];
          const distanceToThisStop = gpsDistance(
            position.coords.latitude, position.coords.longitude,
            stop.coordinates.latitude, stop.coordinates.longitude
          );
          if (distanceToThisStop < distanceToClosestStop) {
            closestStop = stop;
            distanceToClosestStop = distanceToThisStop;
          }
        }
        resolve(closestStop);
      });
    });
  }

  getLuasStopTimes(stopCode) {
    return new Promise((resolve, reject) => {
      fetch(`${this.apiRoot}/luas/stop/${stopCode}`)
        .then(resp => resp.json())
        .then(resp => {
          resolve(this.fixShadeyLuasJson(resp))
        })
        .catch(err => reject(err))
    });
  }

  getNearestLuasStopTimes() {
    return new Promise((resolve, reject) => {
      this.getNearestLuasStop()
        .then((stop) =>
          this.getLuasStopTimes(stop.shortName).then((times) => {
            resolve({
              ...stop,
              stopTimes: times
            });
          })
        )
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default new LuasService('https://roryhaddon.com/api/dublin');