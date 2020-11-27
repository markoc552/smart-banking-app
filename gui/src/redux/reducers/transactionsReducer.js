export default (
  state = {
    count: 0,
    failed: [],
  },
  action
) => {
  if (action.type === "ADD_FAILED") {
    let count = state.count + 1;
    state.failed.push(action.payload);

    return {
      ...state,
      count: count,
    };
  }
  return state;
};
