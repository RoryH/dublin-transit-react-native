import luasService from '../services/luasService';
import busService from '../services/busService';

// Luas actions

export const getNearestLuasStop = () => (dispatch) => {
  luasService.getNearestLuasStopTimes().then((stop) => {
    dispatch(nearestLuasStopSuccess(stop));
  }).catch(nearestLuasStopFailure);
  dispatch({
    type: 'GET_NEAREST_LUAS_STOP_BEGIN'
  });
};

export const nearestLuasStopSuccess = (stop) => ({
  type: 'GET_NEAREST_LUAS_STOP_SUCCESS',
  stop
});

export const nearestLuasStopFailure = (e) => ({
  type: 'GET_NEAREST_LUAS_STOP_FAILURE',
  error: e
});

// Bus Routes

export const getBusRoutes = () => (dispatch) => {
  busService.getSavedRoutes().then((routes) => {
    dispatch(getBusRoutesSuccess(routes));
  }).catch(getBusRoutesFailure);
  dispatch({
    type: 'GET_BUS_ROUTES_BEGIN'
  });
};

export const getBusRoutesSuccess = (routes) => ({
  type: 'GET_BUS_ROUTES_SUCCESS',
  routes
});

export const getBusRoutesFailure = (e) => ({
  type: 'GET_BUS_ROUTES_FAILURE',
  error: e
});

export const addBusRoute = (routeId) => (dispatch) => {
  busService.addBusRoute(routeId).then(() => {
    dispatch({
      type: 'ADD_BUS_ROUTE_SUCCESS',
      routeId
    });
  }).catch((e) => {
    dispatch({
      type: 'ADD_BUS_ROUTE_FAILURE',
      error: e
    });
  });
  dispatch({
    type: 'ADD_BUS_ROUTE_BEGIN'
  });
}