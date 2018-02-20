import {createStore} from 'redux';

import reducer from './reducers/main';

export default createStore(
  reducer,
  (
    typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
