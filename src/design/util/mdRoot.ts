import * as Marked from 'marked';
import { MdTreeComp } from './mdTree';
//const debounce = require('lodash/debounce');
const style_md = 'border: solid; 1px;';
//let current_md: Element = null;

abstract class MdRoot {
  //protected id: string
  readonly name: string;
  protected class: string;
  protected element: Element | null;
  readonly style_md: string;
  static selectTarget: Element | null = null;
  protected tagId: string;
  private static mdTagName: string = 'mdTag';

  private orgText: string = '';

  constructor(name: string) {
    // id , 아이디 만들어야 됨 이것에 대한 로직 필요, 물론 html의 id 아닌 개체 식별 id
    this.name = name;
    this.class = 'md_component ' + name + '_md';
    this.orgText = '';
  }

  public coding(text: string): void {
    try {
      //let _element = document.createElement('template');
      //_element.innerHTML = marked(text);
      this.element = new DOMParser().parseFromString(Marked.default(text), 'text/html').body.firstElementChild;
      this.element.setAttribute(MdRoot.mdTagName, MdTreeComp.getInstance().getId().toString());
      if (this.element.tagName.toLowerCase() === 'p') {
        this.element = this.element.firstElementChild;
      }
      if (this.element !== null) {
        this.element.addEventListener('mouseover', this.eventMouseOver, false);
        this.element.addEventListener('mouseout', this.eventMouseOut, false);
        this.element.addEventListener('click', this.eventMouseSelect, false);
      }
      this.orgText = text;
      MdTreeComp.getInstance().setMdRootItem(this);
    } catch (error) {
      this.element = null;
      console.error('에러발생 :', error);
    }
  }

  public get getElement() {
    this.element.setAttribute('class', this.class);
    return this.element;
  }

  public get getClass() {
    return this.class;
  }

  public eventMouseOver(e: Event) {
    //console.log('mouseOver');
    let target = <HTMLInputElement>e.target;
    target.setAttribute('style', style_md);
  }

  public eventMouseOut(e: Event) {
    //console.log('mouseOut');
    let target = <HTMLInputElement>e.target;
    target.removeAttribute('style');
  }

  public eventMouseSelect(e: Event) {
    console.log('mouseSelect', this);
    let target: HTMLInputElement | HTMLElement = <HTMLInputElement>e.target;
    if (target?.parentElement?.getAttribute('class').includes('md_Select')) {
      return;
    }
    //일단 클래스로 비교 아이디 생성해서 비교로 고처야됨
    //if (target.getAttribute('class').includes('md_Select')) {
    //}
    if (MdRoot.selectTarget) {
      if (MdRoot.selectTarget.getAttribute('class') !== target?.getAttribute('class')) {
        target.setAttribute('class', target.getAttribute('class') + ' md_Select');
        target.appendChild(MdRoot.createChildEditor(target.textContent));
        MdRoot.fristChildRemove(target);
        MdRoot.selectTarget = target;
      }
    } else {
      target.setAttribute('class', target.getAttribute('class') + ' md_Select');
      target.appendChild(MdRoot.createChildEditor(target.textContent));
      MdRoot.selectTarget = target;
    }
  }

  public static createChildEditor(text: string) {
    let _element = document.createElement('input');
    _element.setAttribute('type', 'text');
    _element.setAttribute('class', 'md_input');
    _element.setAttribute('id', 'md_input');
    _element.setAttribute('value', text);
    _element.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'Enter') {
        const value = (<HTMLInputElement>document.getElementById('md_input')).value;
        MdRoot.selectTarget.textContent = value;
        MdRoot.fristChildRemove(null);
      }
    });
    return _element;
  }

  public static fristChildRemove(newTarget: Element | null) {
    if (MdRoot.selectTarget !== null) {
      if (MdRoot.selectTarget.hasAttribute('class')) {
        if (MdRoot.selectTarget.getAttribute('class').includes('md_Select')) {
          if (MdRoot.selectTarget?.firstElementChild) {
            MdRoot.selectTarget.removeChild(MdRoot.selectTarget.firstElementChild);
          }
          MdRoot?.selectTarget?.setAttribute('class', MdRoot.selectTarget.getAttribute('class').replace(' md_Select', ''));
          MdRoot.selectTarget = newTarget;
        }
      }
    }
  }

  public getMdTagId() {
    return this.getMdTagId;
  }

  public eventKeyBorad(e: Event) {}

  public setSeletStyle(): void {}
}

export { MdRoot };

/*
컴포넌트(마크다운) 구조 
기본적으로 mdRoot 클래스를 상속하여 각 컴포넌트를 클래스 생성(기본 모듈들은 다른 클래스를 만들어서 static 그걸 상속할예정)
클릭시 에디터 적용, 기본 기능 클릭시 강조효과(이 기능을 적용하기 위해 에디터 2개를 고수한다. 하나는 진짜 에디팅, 하나는 보여주기용),
보여주는 에디터에서 클릭시 속성값 변환 적용
*/
