import Cache from '../struct/cache';
import HeightMap from './height_map';
import {dobbins} from '../util/random';
import {objMap} from '../util/object';

class DobbinsMap extends Cache {
  constructor(itemClasses, featurePlanes) {
    super();
    this.itemClasses = itemClasses;
    this.featurePlanes = featurePlanes;
  }

  generate(x, y) {
    const features = objMap(plane => plane.get(x, y), this.featurePlanes);
    return dobbins(
      this.itemClasses,
      itemClass => itemClass ? itemClass.energy(features) : 0,
      itemClass => [itemClass ? itemClass.name : '__', x, y].join(' '),
      3
    );
  }
}

export default DobbinsMap;
