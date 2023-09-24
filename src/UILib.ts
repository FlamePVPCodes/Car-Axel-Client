export interface Component {
  parent: HTMLElement;
  render(): void;
}

export interface Icon extends Component {
  icon: string; // SVG Element
  action(...args: any[]): void;
}

interface ElementAttributes {
  id?: string;
  className?: string;
  innerHTML?: string;
  type?: string;
  name?: string;
  value?: string;
}

export function createElement(
  tagName: string,
  parent: Element,
  options?: ElementAttributes
): HTMLElement {
  const element: HTMLElement = document.createElement(tagName);

  if (options) {
    const { id, className, innerHTML, type, name, value } = options;

    if (id) element.id = id;
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    if (type) element.setAttribute("type", type);
    if (name) element.setAttribute("name", name);
    if (value) element.setAttribute("value", value);
  }

  element.classList.add("cac__ALL");

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}
