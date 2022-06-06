interface Elem {
  setCreater(fn: () => Node): void;
  setModifier(fn: (ele: Node) => void): void;
  create(): Node;
  modify(ele: Node): void;
  append(ele: Elem, idx?: number): void;
  children(): Elem[];
}

interface View {
  getNode(ele: Elem): Node | null;
  getElement(ele: Node): Elem | null;
  write(root: Elem): Node;
  parse(html: string): Elem;
  parseNode(ele: Node): Elem;
}

const DEFAULT_CREATER = () => document.createElement('div');
const DEFAULT_MODIFIER = () => {};

export class EditElement implements Elem {
  append ( ele: Elem, idx?: number ): void {
    if (idx === undefined) {
      this.childElems.push(ele);
    } else {
      this.childElems = [...this.childElems.slice(0, idx), ele, ...this.childElems.slice(idx)];
    }
  }
  children (): Elem[] {
    return this.childElems;
  }
  setCreater ( fn: () => Node ): void {
    this.createFn = fn;
  }
  setModifier ( fn: ( ele: Node ) => void ): void {
    this.modifyFn = fn;
    this.needRefresh = true;
    this.createFn = DEFAULT_CREATER;
  }
  create (): Node {
    const result = this.createFn();
    this.needRefresh = false;
    return result; 
  }
  modify ( ele: Node ): void {
    if (!this.needRefresh) return;
    this.modifyFn(ele);
    this.needRefresh = false;
  }

  private needRefresh = false;
  private childElems: Elem[] = [];
  private createFn: (() => Node) = DEFAULT_CREATER;
  private modifyFn: (( ele: Node ) => void) = DEFAULT_MODIFIER;

}

class EditView implements View {
  getNode ( ele: Elem ): Node | null {
    return this.ee2heMap.get(ele) || null;
  }
  getElement ( ele: Node ): Elem | null {
    return this.he2eeMap.get(ele) || null;
  }
  write ( root: Elem ): Node {
    let rootEle = this.getNode(root);
    if (rootEle) {
      root.modify(rootEle);
    } else {
      rootEle = root.create();
      this.ee2heMap.set(root, rootEle);
      this.he2eeMap.set(rootEle, root);
    }

    let children = root.children();
    for (let idx = 0; idx < children.length; idx++) {
      let curChildEle = rootEle.childNodes.item(idx);
      let childEle = this.write(children[idx]);
      if (curChildEle === childEle) {
        continue;
      }
      if (curChildEle) {
        rootEle.insertBefore(childEle, curChildEle);
        curChildEle.remove();
      } else {
        rootEle.appendChild(childEle);
      }
    }

    return rootEle;
  }
  parse ( html: string ): Elem {
    const parseRoot = document.createElement('div');
    parseRoot.innerHTML = html;
    return this.parseNode(parseRoot);
  }
  parseNode(ele: Node): Elem {
    const root = new EditElement();

    root.setCreater(() => {
      if (ele instanceof HTMLElement) {
        return document.createElement(ele.tagName);
      } else if (ele instanceof Text) {
        return document.createTextNode(ele.data);
      }
      return document.createElement('div');
    });

    ele.childNodes.forEach(node => root.append(this.parseNode(node)));

    return root;
  }

  private ee2heMap = new Map<Elem, Node>();
  private he2eeMap = new Map<Node, Elem>();

}

const editViewSrv = new EditView();

export function parseHTML(html: string): Elem {
  return editViewSrv.parse(html);
}

export default function test(root: Elem): Node {
  return editViewSrv.write(root);
}
