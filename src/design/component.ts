import { getMdElement, mdType } from './util/mdSelector';
import { debounce } from 'lodash';

//const debounce = require('lodash/debounce');
let mdEditor = document.getElementsByClassName('mdEditor')[0];
let mdViewer: Element = null;
let flexbox: Element = null;

const initEditor = () => {
  if (!flexbox || flexbox === null) {
    flexbox = document.createElement('div');
    flexbox.setAttribute('class', 'flexbox');
    flexbox.setAttribute('style', '');
    mdEditor.appendChild(flexbox);
  }
};

const createComp = () => {
  Object.entries(mdType).forEach(([key, value]) => {
    let comp = document.createElement('div');
    comp.setAttribute('class', 'li_md');
    comp.setAttribute('style', '' + 'min-width:100px; ' + 'min-height:100px;' + 'width:100px;' + 'background-color: lightblue;');
    comp.innerHTML = key;

    comp.onclick = debounce(() => {
      let element = getMdElement(value);
      if (element !== null) {
        if (mdViewer === null) {
          mdViewer = document.getElementsByClassName('mdViewer')[0];
        }
        mdViewer.appendChild(element);
      }
    }, 300);

    flexbox.appendChild(comp);
  });
};

export { createComp, initEditor };
