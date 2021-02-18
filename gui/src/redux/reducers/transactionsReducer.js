export default (
  state = {
    count: 0,
    failed: [],
  },
  action
) => {
  if (action.type === "ADD_FAILED") {
    let count = state.count + 1;

    return {
      ...state,
      failed: [...state.failed, action.payload],
      count: count,
    };
  }
  return state;
};
