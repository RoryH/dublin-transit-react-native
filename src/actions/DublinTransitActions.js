import dublintransitService from '../services/dublintransitService';

export const getNearestLuasStop = () => (dispatch) => {
  dublintransitService.getNearestLuasStopTimes().then((stop) => {
    dispatch(nearestLuasStopSuccess(stop));
  });
  dispatch({
    type: 'GET_NEAREST_LUAS_STOP_BEGIN'
  });
}

export const nearestLuasStopSuccess = (stop) => ({
  type: 'GET_NEAREST_LUAS_STOP_SUCCESS',
  stop
});

export const nearestLuasStopFailure = () => ({
  type: 'GET_NEAREST_LUAS_STOP_FAILURE'
});