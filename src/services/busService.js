import gpsDistance from 'gps-distance';
import {
  AsyncStorage,
  PermissionsAndroid,
  Platform
} from 'react-native';

const BUS_ROUTES_STORAGE_KEY = 'DublinTransit_busRoutes';

class BusService {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  getSavedRoutes () {
    console.log('getting saved routes');
    return AsyncStorage.getItem(BUS_ROUTES_STORAGE_KEY).then((result) => {
      console.log('result received');
      if (result !== null) {
        // We have data!!
        console.log('got');
        return JSON.parse(result);
      } else {
        return ['22'];
      }
    }).catch((e) => {
      console.log('didn\'t work');
      return ['22'];
    });
  }

  setSavedRoutes (routes) {
    return AsyncStorage.setItem(BUS_ROUTES_STORAGE_KEY, JSON.stringify(routes));
  }

  addBusRoute (routeId) {
    return new Promise((resolve, reject) => {
      const isValidRouteId = /\d{1,3}[abc]?/i.test(routeId);

      if (!isValidRouteId) {
        reject(new Error(`Route '${routeId}' is not valid.`));
        return;
      }

      this.verifyBusRoute(routeId).then(() => {
        this.getSavedRoutes().then((routes) => {
          if (!routes.includes(routeId)) {
            routes.push(routeId);
            this.setSavedRoutes(routes).then(resolve);
          } else {
            reject(new Error('Route is already added'));
          }
        }).catch((e) => reject);
      }).catch(() => {
        reject(new Error(`Route '${routeId}' can not be found.`));
      });
    });
  };

  verifyBusRoute (routeId) {
    return new Promise((resolve, reject) => {
      fetch(
        {
          url: `${this.apiRoot}/bus/route/${routeId}`,
          method: 'HEAD'
        }
      ).then(resp => {
        if (resp.status === 200) {
          resolve();
        } else {
          reject();
        }
      }).catch(err => reject(err))
    });
  }

  getRoute (route) {
    return new Promise((resolve, reject) => {
      fetch(`${this.apiRoot}/bus/route/${route}`)
        .then(resp => resp.json())
        .then(resp => {
          resolve(resp)
        })
        .catch(err => reject(err))
    });
  }

  findClosestStop (stops) {

  }

  getClosestStopsOnRoute (routeObj) {
    return {
      inbound: this.findClosestStop(routeObj.stops.InboundStop),
      outbound: this.findClosestStop(routeObj.stops.OutboundStop)
    }

  }

  getClosestStopAndTimes (route) {
    this.getRoute(route)
      .then((routeObj) => this.getClosestStopsOnRoute(routeObj))
  }

}

export default new BusService('https://roryhaddon.com/api/dublin');