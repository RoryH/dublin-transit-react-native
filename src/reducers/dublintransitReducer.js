const dublintransitReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NEAREST_LUAS_STOP_BEGIN':
      return {
        ...state,
        luasError: null,
        luasLoading: true
      };
    case 'GET_NEAREST_LUAS_STOP_SUCCESS':
      return {
        ...state,
        luasLoading: false,
        luasstop: action.stop
      };
    case 'GET_NEAREST_LUAS_STOP_FAILURE':
      return {
        ...state,
        luasError: action.error,
        luasLoading: false
      };

    case 'GET_BUS_ROUTES_BEGIN':
      return {
        ...state,
        busRoutesError: null,
        busRoutesLoading: true
      };
    case 'GET_BUS_ROUTES_SUCCESS':
      return {
        ...state,
        busRoutesLoading: false,
        busRoutes: action.routes
      };
    case 'GET_BUS_ROUTES_FAILURE':
      return {
        ...state,
        busRoutesError: action.error,
        busRoutesLoading: false
      };
    case 'ADD_BUS_ROUTE_SUCCESS':
      return {
        ...state,
        busRoutes: [ action.routeId, ...state.busRoutes ]
      };
    case 'ADD_BUS_ROUTE_FAILURE':
      return {
        ...state,
        busRoutesError: action.error
      };


    default:
      return state
  }
};

export default dublintransitReducer;