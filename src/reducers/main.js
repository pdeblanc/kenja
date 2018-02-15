import { combineReducers } from 'redux'

import view from './view'

const combined = combineReducers({
  view,
});

const initialState = JSON.parse(localStorage.getItem('state')) || {}

export default (state=initialState, action) => {
  const result = combined(state, action);
  localStorage.setItem('state', JSON.stringify(result));
  return result;
}
