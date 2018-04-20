const dublintransit = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NEAREST_LUAS_STOP_BEGIN':
      return {
        ...state,
        loading: true
      };
    case 'GET_NEAREST_LUAS_STOP_SUCCESS':
      return {
        ...state,
        loading: false,
        luasstop: action.stop
      };
    default:
      return state
  }
};

export default dublintransit;