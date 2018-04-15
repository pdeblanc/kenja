import {poisson} from '../util/random';
import {v2} from 'murmurhash';
import {rangeMap} from '../util/array';

const INITIAL_BLOCK_SIZE = 2 ** 3;
const MAX_IMMEDIATE_STARS = 16;
const STAR_SEED = 87123645;

class Block {
  constructor({x, y, w, h, children, parent}) {
    Object.assign(this, {x, y, w, h, _children: children, parent});
  }

  children() {
    if (!this._children) {
      // TODO
    }
    return this._children;
  }

  contains({x, y}) {
    return (
      this.x <= x
      && this.y <= y
      && y < this.x + this.w
      && y < this.y + this.h
    );
  }

  distanceToEdge({x, y}) {
    xDistance = Math.min(Math.abs(this.x - x), Math.abs(this.x + this.w - x));
    yDistance = Math.min(Math.abs(this.y - y), Math.abs(this.y + this.h - y));
    return (xDistance ** 2 + yDistance ** 2) ** 0.5;
  }

  area() {
    return this.w * this.h;
  }

  translateBox({dx, dy}) {
    const {x, y, w, h} = this;
    return {
      x: x + dx,
      y: y + dy,
      w,
      h,
    };
  }

  static boundingBox(blocks) {
    const x = Math.min(...blocks.map(block => block.x));
    const y = Math.min(...blocks.map(block => block.y));
    const w = Math.max(...blocks.map(block => block.x + block.w - x));
    const h = Math.max(...blocks.map(block => block.y + block.h - y));
    return {x, y, w, h};
  }

  createSibling() {
    const {x, y, w, h} = this;
    let dx = dy = 0;
    if (w >= h) {
      dy = y + h / 2 > 0 ? -h : 0;
    } else {
      dx = x + w / 2 > 0 ? -x : 0;
    }
  }

  hashString() {
    const {x, y, w, h} = this;
    return [x, y, w, h].join(',');
  }
}

export default class StarField {
  constructor({createStar, density, seedInt}) {
    Object.assign(this, {createStar, density, seedInt});
    this.top = new Block({
      x: 0,
      y: 0,
      w: INITIAL_BLOCK_SIZE,
      h: INITIAL_BLOCK_SIZE,
      children: null,
      parent: null,
    });
    this.stars = new Map();
    this.starCounts = new Map();
  }

  generateBlockContents(block) {
    const {starCounts, stars, seedInt, density, createStar} = this;
    // generate star count
    if (!starCounts.has(block)) {
      starCounts.set(block, poisson(block.hashString(), seedInt, density));
    }
    const starCount = this.starCounts.get(block);
    if (starCount <= MAX_IMMEDIATE_STARS) {
      // generate immediate stars
      if (!stars.has(block)) {
        const seedStr = block.hashString();
        const sharedSeed = v2(seedStr, this.seedInt + STAR_SEED);
        stars.set(block, rangeMap(
          0, starCount, i => createStar(seedStr, sharedSeed + i)
        ));
      }
    } else {
      // assign star counts for children
    }

  }

  nearest({x, y}) {
    while (!this.top.contains({x, y})) {
      this.top = this.top.createParent();
    }
    let {point, distance} = this.top.nearest({x, y});
    while (point === null || distance > this.top.distanceToEdge({x, y})) {
      this.top = this.top.createParent();
      {point, distance} = this.top.nearest({x, y});
    }
  }
}
