import { createComp, initEditor } from './component';
import { MdRoot } from './util/mdRoot';

const mainCss = require('./style.css');
import * as Marked from 'marked';
const mdViewerId = 'viewer';
const mdViewerClass = 'mdViewer';
const mdRootId = 'root';

function setbody() {
  let body = document.getElementsByTagName('body')[0];
  body.setAttribute('style', mainCss);
  body.addEventListener('click', (e: Event) => {
    let target = <HTMLInputElement>e.target;
    if (
      !target.getAttribute('class')?.includes('md_component') ||
      target.getAttribute('class') === undefined ||
      target.getAttribute('class') === null
    ) {
      if (target?.parentElement?.getAttribute('class')?.includes('md_component')) {
        return;
      }
      console.log('no select');
      MdRoot.fristChildRemove(null);
    }
  });

  initEditor();
}

function component() {
  let element = getMdComponent();

  if (element) {
    /* lodash is required for the next line to work */
    console.log('set marked');
    element.innerHTML = Marked.default('**Emphasized** text. <div style="background-color:red"> agag</div>');
  }

  return element;
}

function getMdComponent() {
  let root = document.getElementById(mdRootId);
  let mdElement = null;
  if (root) {
    mdElement = root.firstElementChild;
    console.log('mdElement', mdElement);

    if (mdElement && mdElement.getAttribute('id') !== mdViewerId) {
      let newElement = document.createElement('div');
      newElement.setAttribute('id', mdViewerId);
      newElement.setAttribute('class', mdViewerClass);
      root.insertBefore(newElement, mdElement);

      return newElement;
    }
  }
  return mdElement;
}

setbody();
component();
createComp();
