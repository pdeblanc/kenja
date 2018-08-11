export default class Sku {
  constructor(name, symbol, energy) {
    this.name = name;
    this.symbol = symbol;
    this.energy = energy;
  }

  cssClass() {
    return this.name.replace(' ', '-');
  }
};
