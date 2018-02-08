import React from 'react';
import {render} from 'react-dom';

import './styles/main.scss';

import Viewport from './components/viewport.jsx';
import biomes from './defs/biomes';
import Plane from './world/plane';

const plane = new Plane(biomes);

render(<Viewport plane={plane} />, document.getElementById('main'));
