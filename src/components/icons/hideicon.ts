import { UIManager } from "../../UIManager";
import { Icon, createElement } from "../../UILib";
import "./hideicon.ts.less";

export default class HideIcon implements Icon {
    public parent: HTMLElement;
    public icon: string;
    public name: string;
    private iconElement: HTMLElement;
    private hoverName: HTMLElement;

    constructor(parent: HTMLElement, name: string, icon: string) {
        this.parent = parent;
        this.icon = icon;
        this.name = name;
        this.render();
    }

    action(): void {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: '\\' }));
    }

    render(): void {
        this.iconElement = createElement("button", this.parent, {
            className: "cac__tabbar__button",
            innerHTML: this.icon,
        });

        this.iconElement.onclick = this.action;

        this.hoverName = createElement("p", this.iconElement, {
            className: "cac__tabbar__button__hovername",
            innerHTML: this.name,
        });
    }
}
