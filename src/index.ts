import { UIManager } from "./UIManager";
import { functions } from "./modules/modules";
import { DEBUG } from "./global/constant";
import { createElement } from "./UILib";
import { getUpdate } from "./updater";

type moduleJSON = {
  display: string;
  section: string;
  function: string;
  always?: boolean;
  reset?: boolean;
  options?: any;
};

const MODULES_STORAGE_KEY = 'car-axle-client';
const DEFAULT_MODULE_OPTIONS = {
  always: false,
  reset: false,
  options: {},
};

function loadModuleValues(UI: UIManager) {
  const cacStorage = JSON.parse(localStorage.getItem(MODULES_STORAGE_KEY) || '[]');
  cacStorage.forEach((sectionValues: any) => {
    UI.getSectionFromID(sectionValues['sectionID'])?.setAllButtonValuesFromArray(sectionValues['buttonValues']);
  });
}

function addModules(UI: UIManager): void {
  const modules: moduleJSON[] = require('./modules/modules.json');

  for (let _module of modules) {
    const section = UI.getSectionFromID(_module['section']);

    if (section == null) continue;

    const onClickFunction: (active: boolean, options: Array<boolean | string>) => void =
      functions[_module['function']] || functions['none'];

    _module = { ...DEFAULT_MODULE_OPTIONS, ..._module }; // Merge with default options

    section.addButton(_module['display'], _module['always'], _module['reset'], onClickFunction, true, _module['options']);
  }

  if (localStorage.getItem(MODULES_STORAGE_KEY)) {
    loadModuleValues(UI);
  }
}

function main(): void {
  const UI: UIManager = new UIManager();

  // Define constants for section IDs and SVG content
  const GAME_SECTION_ID = "game";
  const GAME_SECTION_DISPLAY = "Games";
  const GAME_SECTION_DESCRIPTION = "Actual games that work (maybe)";
  const GAME_SECTION_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">...</svg>`;

  // Create the game section
  const games = UI.newSection(GAME_SECTION_ID, GAME_SECTION_DISPLAY, GAME_SECTION_DESCRIPTION, GAME_SECTION_ICON, true);

  // Create an iframe for the game section
  const gamesIframe = createElement('iframe', games.sectionContent, { id: 'cac__games__iframe' });
  gamesIframe.setAttribute('src', 'https://penguinify-web-dev.github.io/yourgay');

  // Add other sections
  const sections = [
    { id: "exploit", display: "Exploits", description: "Neat, useful tricks to make your life better", icon: "<svg>...</svg>" },
    { id: "fun", display: "Fun", description: "Goofy stuff", icon: "<svg>...</svg>" },
    { id: "client", display: "Client", description: "Client settings and misc stuff", icon: "<svg>...</svg>" },
    { id: "credit", display: "Credits", description: "I am a professional skidder", icon: "<svg>...</svg>" },
  ];

  sections.forEach((sectionData) => {
    UI.newSection(sectionData.id, sectionData.display, sectionData.description, sectionData.icon);
  });

  addModules(UI);

  // Event listener for keydown
  document.addEventListener('keydown', (e) => {
    if (e.key === '\\') {
      UI.toggleUI();
    }
    // Shift + F for fullscreen
    if (e.key === 'F' && e.shiftKey) {
      gamesIframe.requestFullscreen();
    }
  });

  getUpdate(UI.container);
}

// Run the main function
main();
