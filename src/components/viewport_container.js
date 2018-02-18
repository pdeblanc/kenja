import { connect } from 'react-redux';

import Viewport from './viewport.jsx';
import {translate} from '../actions/view';

const props = (state, ownProps) => {
  const {x, y, radius} = state.view;
  return Object.assign({x, y, radius, translate}, ownProps);
};

const dispatch = {translate};

export default connect(props, dispatch)(Viewport);
