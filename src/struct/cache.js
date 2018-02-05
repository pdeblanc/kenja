export default class Cache {
  constructor() {
    this._values = new Map();
  }

  get(...key) {
    if (this._values.has(key)) {
      return this._values.get(key);
    }
    const value = this.generate(...key);
    this._values.set(key, value);
    return value;
  }
}
