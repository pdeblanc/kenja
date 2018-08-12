import Cache from '../struct/cache';
import {mod} from '../util/numeric';

// placeholders:
const binomial = null;

/*
 * A territory map represents a set of disc-shaped territories.
 * Each disc is centered at a point in ℤ² and has a radius 0 < r ≤ R,
 * where R is some pre-specified global maximum.
 * The data structure for the territory map is a spatial tree consisting
 * of square blocks. The maximum side length is the smallest power of two
 * equal to or exceeding R. Any block with side length > 1 may contain
 * four sub-blocks.
 * Each disc is directly contained by some block whose side length is ≥
 * the disc's radius.
 */

// a block of side length > 1 will be subdivided iff at least this many
// discs can be distributed among its sub-blocks.
const SUBDIVIDE_THRESHOLD = 16;

class Block {
  constructor(
    {left, top, sideLength, discCount, radiusDistribution, generateDisc}
  ) {
    // radiusDistribution is the original distribution, not truncated
    // to the radius of this block.
    Object.assign(
      this,
      {left, top, sideLength, discCount, radiusDistribution, generateDisc}
    );
    this.right = left + sideLength;
    this.bottom = top + sideLength;
    this.generated = false;
    this.subBlocks = null; // set by this.generate()
    this.discs = null; // set by this.generate()
  }

  generate() {
    const {discCount, generateDiscs, sideLength} = this;
    if (sideLength === 1 || discCount < SUBDIVIDE_THRESHOLD) {
      generateDiscs(discCount);
      this.subBlocks = [];
    }
    else {
      const pSmall = (
        radiusDistribution.cdf(sideLength / 2) /
        radiusDistribution.cdf(sideLength)
      );
      const smallDiscCount = binomial(discCount, pSmall);
      if (smallDiscCount >= SUBDIVIDE_THRESHOLD) {
        generateDiscs(discCount - smallDiscCount);
        generateSubBlocks(smallDiscCount);
      }
    }
    this.generated = true;
  }

  generateSubBlocks(discCount) {
    const {left, top, radiusDistribution, generateDisc} = this;
    const sideLength = this.sideLength / 2;
    const sharedParams = {sideLength, radiusDistribution, generateDisc};
    const count12 = binomial(smalldiscCount, 1/2);
    const count34 = smallDiscCount - count12;
    const count1 = binomial(count12, 1/2);
    const count2 = count12 - count1;
    const count3 = binomial(count34, 1/2);
    const count4 = count34 - count3;
    this.subBlocks = [
      new Block({left, top, discCount: count1, ...sharedParams}),
      new Block(
        {left: left + sideLength, top, discCount: count2, ...sharedParams}
      ),
      new Block(
        {left, top: top + sideLength, discCount: count3, ...sharedParams}
      ),
      new Block({
        left: left + sideLength,
        top: top + sideLength,
        discCount: count4,
        ...sharedParams
      }),
    ];
  }

  distanceToPoint({x, y}) {
    /*
     * The four line segments bounding the block can extend to form lines.
     * These lines would divide the plane into nine regions.
     * Each region is handled by a different case below.
     */
    if (x < this.left) {
      if (y < this.top) {
        return Math.sqrt((x - this.left) ** 2 + (y - this.top) ** 2);
      } else if (y <= this.bottom) {
        return Math.abs(x - this.left);
      } else {
        return Math.sqrt((x - this.left) ** 2 + (y - this.bottom) ** 2);
      }
    } else if (x <= this.right) {
      if (y < this.top) {
        return Math.abs(y - this.top);
      } else if (y <= this.bottom) {
        return 0;
      } else {
        return Math.abs(y - this.bottom);
      }
    } else {
      if (y < this.top) {
        return Math.sqrt((x - this.right) ** 2 + (y - this.top) ** 2);
      } else if (y <= this.bottom) {
        return Math.abs(x - this.right);
      } else {
        return Math.sqrt((x - this.right) ** 2 + (y - this.bottom) ** 2);
      }
    }
  }

  *intersectDisc({x, y, r}) {
    if (this.distanceToPoint({x, y}) <= r + this.sideLength) {
      for (const disc of this.discs) {
        if (disc.intersect({x, y, r}))  {
          yield disc;
        }
      }
      for (const block of this.children) {
        yield from block.intersectDisc({x, y, r})
      }
    }
  }
}

class BlockRoot extends Cache {

}

export default class TerritoryMap {
  constructor({maxBlockSize}) {
    // maxBlockSize should be a power of 2
    Object.assign(this, {maxBlockSize});
    this._root = BlockRoot();
  }

  root({x, y}) {
    const left = x - mod(x, this.maxBlockSize);
    const top = y - mod(y, this.maxBlockSize);
    return this._root.get(left, top);
  }

  intersectDisc({x, y, r}) {
  }
}
