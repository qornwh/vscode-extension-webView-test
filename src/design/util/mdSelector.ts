import { MdRoot } from './mdRoot';
import { StrongMD } from './mdStrong';

interface MdType {
  strong: number;
  italics: number;
  strong_italics: number;
  del: number;
  u: number;
}

const mdType: MdType = {
  strong: 1,
  italics: 2,
  strong_italics: 3,
  del: 4,
  u: 5,
};

function getMdElement(type: number): Element | null {
  let element: MdRoot;
  switch (type) {
    case mdType.strong:
      element = new StrongMD(type);
      console.log('create strong');
      break;

    case mdType.italics:
      element = new StrongMD(type);
      console.log('create italics');
      break;

    case mdType.strong_italics:
      //element = new StrongMD(type);
      console.log('create strong_italics');
      break;

    case mdType.del:
      element = new StrongMD(type);
      console.log('create del');
      break;

    case mdType.u:
      element = new StrongMD(type);
      console.log('create u');
      break;

    default:
      return null;
  }

  return element.getElement;
}

//function getMdSeletor() {}

export { mdType, getMdElement };
