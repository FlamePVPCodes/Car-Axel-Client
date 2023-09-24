import { Section } from "./components/section";
import RemoveSave from "./components/icons/removesave";
import AddSave from "./components/icons/saveicon";
import Destroy from "./components/icons/xicon";
import Hide from "./components/icons/hideicon";
import { createElement } from "./UILib";
import "./global/style.less";

export class UIManager {
  public container!: HTMLElement;
  public gui!: HTMLElement;
  public sidebar!: HTMLElement;
  public sections: Array<Section> = [];
  public enabledSection!: Section;
  public mainContent!: HTMLElement;
  public tabbar!: HTMLElement;
  private _sectionBackground!: HTMLElement;

  constructor() {
    this._createGUI();
    this._createIcons();
  }

  private _createGUI(): void {
    this.container = createElement("div", document.body, {
      id: "cac__CONTAINER",
    });
    this.gui = createElement("div", this.container, {
      id: "cac__GUI",
    });
    this.sidebar = createElement("div", this.gui, {
      id: "cac__SIDEBAR",
    });
    this.mainContent = createElement("div", this.gui, {
      id: "cac__MAINCONTENT",
    });
    this._sectionBackground = createElement("div", this.sidebar, {
      id: "cac__section__BACKGROUND",
    });
    this.tabbar = createElement("div", this.mainContent, {
      id: "cac__TABBAR",
    });

    // Aesthetic
    createElement("div", this.sidebar, {
      id: "cac__LOGO",
      innerHTML: "car axle client",
    });
  }

  private _createIcons(): void {
    new AddSave(this.tabbar, "New Save", `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">...</svg>`, this);
    new RemoveSave(this.tabbar, "Remove Save", `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">...</svg>`);
    new Hide(this.tabbar, "Hide", `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">...</svg>`);
    new Destroy(this.tabbar, "Self Destruct", `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">...</svg>`);
  }

  private _enableSection(section: Section): void {
    this.enabledSection = section;
    section.enabled = true;
    section.sectionContent.style.display = "block";
    section.sectionContent.style.pointerEvents = "auto";

    this._sectionBackground.animate(
      [
        {
          top: `${section.navButton.offsetTop}px`,
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
        easing: "ease",
      }
    );
    section.sectionContent.animate(
      [
        {
          opacity: 0,
          transform: "scale(1.1)",
        },
        {
          opacity: 1,
          transform: "scale(1)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease",
      }
    );
  }

  private _disableSection(section: Section): void {
    section.enabled = false;
    section.sectionContent.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0,
          transform: "scale(0.9)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease",
      }
    );
    setTimeout(() => {
      section.sectionContent.style.display = "none";
      section.sectionContent.style.pointerEvents = "none";
    }, 490);
  }

  private _handleSectionMouseDown(section: Section): void {
    if (section.enabled) return;
    if (this.enabledSection) this._disableSection(this.enabledSection);
    this._enableSection(section);
  }

  newSection(
    id: string,
    displayName: string,
    description: string,
    icon: string,
    enabled: boolean = false
  ): Section {
    let section: Section = new Section(
      id,
      displayName,
      description,
      icon,
      this.sidebar,
      this.mainContent,
      enabled
    );

    section.navButton.onmousedown = () => this._handleSectionMouseDown(section);
    enabled && this._enableSection(section);

    this.sections.push(section);
    return section;
  }

  toggleUI(): void {
    if (this.container.style.display === "none") {
      this.container.style.display = "flex";
      this.gui.animate(
        [
          {
            transform: "scale(0)",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 500,
          fill: "forwards",
          easing: "ease-out",
        }
      );

      return;
    }

    this.container.style.display = "none";
  }

  getSectionFromID(id: string): Section | undefined {
    return this.sections.find((section) => section.id === id);
  }
}
