export default (state = { status: [], count: 0 }, action) => {
  if (action.type === "GET_WAULTS") {
    return {
      ...state,
      active: action.payload,
    };
  } else if (action.type === "GET_WAULT_STATUS") {
    console.log("AAAAAAAAA", action.payload);

    return {
      ...state,
      status: action.payload.waults,
      count: action.payload.count,
    };
  }
  return state;
};
