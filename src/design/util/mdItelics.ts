import { MdRoot } from './mdRoot';

class ItelicsMD extends MdRoot {
  constructor() {
    super('italics');
    this.coding('_' + this.name + '_');
  }

  get myElement(): Element | null {
    return this.element.firstElementChild;
  }
}

export { ItelicsMD };
