const INITIAL_VIEW = {
  x: 0,
  y: 0,
  radius: 9,
};

const updaters = {
  'VIEW.TRANSLATE': (state, action) => ({
    x: state.x + action.x,
    y: state.y + action.y
  }),
  'VIEW.ZOOM_OUT': ({radius}) => ({radius: Math.min(radius + 1, 50)}),
  'VIEW.ZOOM_IN': ({radius}) => ({radius: Math.max(radius - 1, 1)})
}

export default (state=INITIAL_VIEW, action) => {
  const {type} = action;
  const updater = updaters[type];
  return updater ? {...state, ...updater(state, action)} : state;
}
