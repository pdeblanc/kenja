const INITIAL_VIEW = {
  x: 0,
  y: 0,
};

export default (state=INITIAL_VIEW, action) => {
  const {type} = action;
  if (type === 'VIEW.TRANSLATE') {
    return {x: action.x + state.x, y: action.y + state.y};
  }
  return state;
}
