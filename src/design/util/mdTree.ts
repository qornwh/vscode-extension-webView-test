import { MdRoot } from './mdRoot';

class MdTreeComp {
  private static instance: MdTreeComp;
  private items: Array<MdRoot>;

  private id: number;

  private constructor() {
    this.id = -1;
  }

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  public getId() {
    this.id++;
    return this.id;
  }

  public setMdRootItem(item: MdRoot) {
    let flag = false;
    this.items.forEach((element: MdRoot) => {
      if (element.getMdTagId() === item.getMdTagId()) {
        flag = true;
      }
    });
    if (!flag) {
      this.items.push(item);
    }
  }

  public getMdRootItem(id: string = ''): MdRoot {
    let mdRoot: MdRoot = null;
    this.items.forEach((element: MdRoot) => {
      if (element.getMdTagId().toString() === id) {
        mdRoot = element;
      }
    });
    return mdRoot;
  }
}

export { MdTreeComp };
