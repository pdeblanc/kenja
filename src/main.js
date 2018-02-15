import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {createStore} from 'redux';

import './styles/main.scss';

import reducer from './reducers/main';
import ViewportContainer from './components/viewport_container';
import biomes from './defs/biomes';
import Plane from './world/plane';

const plane = new Plane(biomes);

render(
  <Provider store={createStore(reducer)}>
    <ViewportContainer plane={plane} />
  </Provider>,
  document.getElementById('main')
);
