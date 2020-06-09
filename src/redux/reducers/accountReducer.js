export default (state = {}, action) => {
  if (action.type === "CREATE_ACCOUNT") {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  } else if (action.type === "CHECK_ACCOUNT") {
    return {
      ...state,
      status: action.payload
    };
  } else if (action.type === "GET_ACCOUNT") {
    return {
      ...state,
      user: action.payload
    };
  } else if (action.type === "GET_ACCOUNTS") {
    return {
      ...state,
      users: action.payload
    };
  } else if (action.type === "UPDATE_ACCOUNT") {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  }

  return state;
};
