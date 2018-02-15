import { connect } from 'react-redux';

import Viewport from './viewport.jsx';
import {translate} from '../actions/view';

const props = (state, ownProps) => {
  const {x, y} = state.view;
  return Object.assign({x, y, translate}, ownProps);
};

const dispatch = {translate};

export default connect(props, dispatch)(Viewport);
