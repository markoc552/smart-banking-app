export default(state = {}, action) => {
  if (action.type === "CREATE_ACCOUNT") {
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  }
  return state;
}
