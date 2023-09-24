import { Icon, createElement } from "../../UILib";
import "./icon.ts.less";

export default class XIcon implements Icon {
    public parent: HTMLElement;
    public icon: string;
    public name: string;
    public hoverName!: HTMLElement;
    private iconElement!: HTMLElement;

    constructor(parent: HTMLElement, name: string, icon: string) {
        this.parent = parent;
        this.icon = icon;
        this.name = name;
        this.render();
    }

    action = (): void => {
        // Define the action to be performed when the icon is clicked.
        // Example: closing a window, removing an element, etc.
        const container = document.getElementById("cac__CONTAINER");
        if (container) {
            container.style.animation = "fadeout 0.3s ease-in-out";
            setTimeout(() => {
                container.remove();
            }, 300);
        }
    };

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
