import Map2 from 'map2';

export default class Cache {
  constructor() {
    this._values = new Map2();
  }

  get(...key) {
    if (this._values.has(...key)) {
      return this._values.get(...key);
    }
    const value = this.generate(...key);
    this._values.set(...key, value);
    return value;
  }
}
