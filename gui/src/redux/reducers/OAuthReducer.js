const INITIAL_STATE = {
  isSigned: null,
  userID: null
}

export default(state = INITIAL_STATE, action) => {
  if (action.type === "SIGN_IN") {
    return {
      ...state,
      isSigned: true,
      userID: action.payload
    }
  } else if (action.type === "SIGN_OUT") {
    return {
      ...state,
      isSigned: false,
      userID: null
    }
  }
  return state;
}
