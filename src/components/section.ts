import { createElement } from "../UILib";
import Button from "./button";
import "./section.ts.less";

interface SectionConfig {
  id: string;
  displayName: string;
  description: string;
  icon: string;
  container: HTMLElement;
  maincontent: HTMLElement;
  enabled?: boolean;
}

export class Section {
  public id: string;
  public navButton!: HTMLElement;
  public enabled: boolean;
  public sectionTitle!: HTMLElement;
  public sectionContent!: HTMLElement;
  public buttons: Array<Button> = [];

  private _displayName: string;
  private _container: Element;
  private _description: string;
  private _icon: string;

  constructor(config: SectionConfig) {
    const {
      id,
      displayName,
      description,
      icon,
      container,
      maincontent,
      enabled = false,
    } = config;

    this.id = id;
    this._displayName = displayName;
    this._container = container;
    this._description = description;
    this._icon = icon;
    this.enabled = enabled;
    this._createSectionElements(maincontent);

    // anti code reuseability
    if (this.id === "client" || this.id === "credit") {
      this.navButton.style.position = "absolute";
      this.navButton.style.bottom = this.id === "client" ? "9.5vh" : "20px";
    }
  }

  private _createSectionElements(parent: HTMLElement): void {
    this.navButton = createElement("div", this._container, {
      className: "cac__section",
      innerHTML: this._icon + this._displayName,
    });
    this.sectionContent = createElement("div", parent, {
      className: "cac__section__content",
      id: `cac__content__${this.id}`,
    });
    createElement("h1", this.sectionContent, {
      innerHTML: this._displayName,
      className: "cac__section__title",
    });
    createElement("p", this.sectionContent, {
      innerHTML: this._description,
      className: "cac__section__description",
    });
  }

  addButton(
    title: string,
    always: boolean,
    reset: boolean,
    onClickFunction: (active: boolean, options: Array<boolean | string>) => void,
    render: boolean = false,
    options: any /* should not be any but here we are. */
  ): void {
    this.buttons.push(
      new Button(this.sectionContent, title, always, reset, onClickFunction, render, options)
    );
  }

  getAllButtonValues() {
    return this.buttons.map((button) => [button.enabled]);
  }

  setAllButtonValuesFromArray(buttonValues: boolean[][]) {
    for (const [index, value] of buttonValues.entries()) {
      this.buttons[index].values = { enabled: value[0] };
    }
  }
}
