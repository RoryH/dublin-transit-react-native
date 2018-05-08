const dublintransitReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NEAREST_LUAS_STOP_BEGIN':
      return {
        ...state,
        luasLoading: true
      };
    case 'GET_NEAREST_LUAS_STOP_SUCCESS':
      return {
        ...state,
        luasLoading: false,
        luasstop: action.stop
      };
    default:
      return state
  }
};

export default dublintransitReducer;