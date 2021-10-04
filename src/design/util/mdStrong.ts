import { MdRoot } from './mdRoot';
import { mdType } from './mdSelector';

class StrongMD extends MdRoot {
  constructor(index: number) {
    super('strong');
    this.myFrontToken = this.myGetToken(index);
    //this.myBackToken = index === MdType.strong_italics ? this.myFrontToken.split('').reverse().toString().replace(/,/g, '') : this.myFrontToken;
    this.myBackToken = index === mdType.u ? this.myFrontToken.replace('<', '</') : this.myFrontToken;
    console.log('this.myBackToken', this.myBackToken);
    this.coding(this.myFrontToken + this.name + this.myBackToken);
  }

  private myFrontToken: String;
  private myBackToken: String;

  private myGetToken(index: number): String {
    if (index === mdType.strong) {
      return '**';
    } else if (index === mdType.italics) {
      return '_';
      //} else if (index === MdType.strong_italics) {
      //  return '_**';
    } else if (index === mdType.del) {
      return '~~';
    } else if (index === mdType.u) {
      return '<u>';
    }
    return '';
  }

  get myElement(): Element | null {
    return this.element.firstElementChild;
  }
}

export { StrongMD };
