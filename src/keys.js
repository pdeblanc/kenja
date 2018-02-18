import Store from './store';
import {translate} from './actions/view';

const keyActionCreators = {
  ArrowLeft: () => translate(-1, 0),
  ArrowRight: () => translate(1, 0),
  ArrowUp: () => translate(0, -1),
  ArrowDown: () => translate(0, 1),
};

export const handleKeyPress = e => {
  const creator = keyActionCreators[e.key];
  if (creator) {
    Store.dispatch(creator());
  } else {
    console.log(e);
  }
};
