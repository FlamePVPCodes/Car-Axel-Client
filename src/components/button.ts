import { Component, createElement } from "../UILib";
import "./button.ts.less";

enum OptionType {
    Checkbox = 'checkbox',
    Text = 'text'
}

type MenuOption = {
    title: string,
    type: OptionType,
    default: boolean | string,
    optionParams: string[]
}

export default class Button implements Component {
    public enabled: boolean = false;
    public button!: HTMLElement;
    public menuContainer!: HTMLElement;
    public parent: HTMLElement;
    private title: string;
    private onClickFunction: (active: boolean, options: Array<boolean | string>) => void;
    private always: boolean;
    private reset: boolean;
    private menuOptions: MenuOption[];
    private menuValues: Array<boolean | string> = [];

    constructor(
        parent: HTMLElement,
        title: string,
        always: boolean,
        reset: boolean,
        onClickFunction: (active: boolean, options: Array<boolean | string>) => void,
        render: boolean = false,
        menuOptions: MenuOption[]
    ) {
        this.parent = parent;
        this.title = title;
        this.onClickFunction = onClickFunction;
        this.always = always;
        this.reset = reset;
        this.menuOptions = menuOptions;

        if (menuOptions.length > 0) this.title += '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="cac__button__menuicon"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';

        render && this.render();
    }

    private toggle() {
        this.enabled = !this.enabled;
        this.button.classList.toggle("cac__button--enabled", this.enabled);
        this.enabled ? this.onClickFunction(true, this.menuValues) : this.onClickFunction(false, this.menuValues);
    }

    private getMenuValues() {
        this.menuValues = [];
        for (let option of this.menuContainer.querySelectorAll(".cac__button__menu-container__option-container")) {
            const checkbox = option.querySelector(".cac__button__menu-container__option-container__checkbox") as HTMLInputElement;
            const text = option.querySelector(".cac__button__menu-container__option-container__text") as HTMLInputElement;

            if (checkbox) {
                this.menuValues.push(checkbox.checked);
            } else if (text) {
                this.menuValues.push(text.value);
            }
        }
    }

    private updateFunctionOptions(): void {
        this.getMenuValues();
        this.toggle();
        this.toggle();
    }

    private addMenuOption(option: MenuOption) {
        const optionContainer = createElement("div", this.menuContainer, { className: "cac__button__menu-container__option-container" });
        createElement("p", optionContainer, { className: "cac__button__menu-container__option-container__title", innerHTML: option.title });

        switch (option.type) {
            case OptionType.Checkbox:
                const checkbox = createElement("input", optionContainer, { type: "checkbox", className: "cac__button__menu-container__option-container__checkbox" }) as HTMLInputElement;
                checkbox.checked = option.default as boolean;
                checkbox.addEventListener("change", this.updateFunctionOptions.bind(this));
                break;
            case OptionType.Text:
                const textInput = createElement("input", optionContainer, { type: "text", className: "cac__button__menu-container__option-container__text" }) as HTMLInputElement;
                textInput.value = option.default as string;
                textInput.addEventListener("change", this.updateFunctionOptions.bind(this));
                break;
        }
    }

    private toggleMenu(e: MouseEvent) {
        e.preventDefault();
        this.menuContainer.classList.toggle("cac__button__menu-container--enabled");
        this.button.querySelector('svg')?.classList.toggle("cac__button__menuicon--enabled");
    }

    private handleMouseDown(e: MouseEvent) {
        if (e.button === 2 && this.menuOptions?.length > 0) this.toggleMenu(e);
        if (e.button !== 0 || (this.enabled && this.always)) return;
        this.toggle();

        if (this.reset) setTimeout(() => {
            this.toggle();
        }, 1000);
    }

    public render
