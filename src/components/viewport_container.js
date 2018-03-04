import { connect } from 'react-redux';

import Viewport from './viewport.jsx';
import {translate} from '../actions/view';

const props = (state, ownProps) => {
  const {x, y, radius} = state.view;
  return {...ownProps, x, y, radius, translate};
};

const dispatch = {translate};

export default connect(props, dispatch)(Viewport);
