import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import './styles/main.scss';

import ViewportContainer from './components/viewport_container';
import biomes from './defs/biomes';
import skus from './defs/skus';
import Plane from './world/plane';
import {handleKeyPress} from './keys';
import store from './store';

const plane = new Plane(biomes, skus);

render(
  <Provider store={store}>
    <ViewportContainer plane={plane} />
  </Provider>,
  document.getElementById('main')
);

document.addEventListener('keydown', handleKeyPress, false);
