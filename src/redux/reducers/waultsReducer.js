export default (state = {}, action) => {
  if (action.type === "GET_WAULTS") {
    return {
      ...state,
      active: action.payload,
    };
  } else if (action.type === "GET_WAULT_STATUS") {
    return {
      ...state,
      status: action.payload.waults,
      count: action.payload.count,
    };
  }
  return state;
};
