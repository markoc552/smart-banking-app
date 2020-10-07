export default (state = {profile: "https://www.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png"}, action) => {
  if (action.type === "CREATE_ACCOUNT") {
    return {
      ...state,
      [action.payload.id]: action.payload,
    };
  } else if (action.type === "CHECK_ACCOUNT") {
    return {
      ...state,
      status: action.payload,
    };
  } else if (action.type === "GET_ACCOUNT") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "GET_ACCOUNTS") {
    return {
      ...state,
      users: action.payload,
    };
  } else if (action.type === "UPDATE_ACCOUNT") {
    return {
      ...state,
      [action.payload.id]: action.payload,
    };
  } else if (action.type === "ETH_STATUS") {
    return {
      ...state,
      [action.payload.id]: action.payload,
    };
  } else if (action.type === "GET_NAME") {
    return {
      ...state,
      name: action.payload,
    };
  } else if (action.type === "CHOOSE_PROFILE") {
    return { ...state, profile: action.payload };
  }

  return state;
};
