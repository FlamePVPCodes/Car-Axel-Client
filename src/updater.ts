import Notification from "./components/notification";

// Define the current version and update index
const currentVersion = 2;

function showUpdate(parent: HTMLElement, newVersion: string) {
  const notification = new Notification(
    parent,
    "A New Update is Available!",
    `You can update from <strong>v${currentVersion} -> v${newVersion}</strong><br> Updating can fix issues you may currently be having and will add new features. They can also cause issues. Be careful!`,
    { text: "Install", fn: () => window.open("https://car-axle-client.github.io/install") }
  );
}

// Function to check for updates
export function getUpdate(main: HTMLElement) {
  fetch("https://raw.githubusercontent.com/car-axle-client/car-axle-database/main/version.json")
    .then((result) => {
      if (!result.ok) {
        throw new Error(`Network response was not ok: ${result.status} ${result.statusText}`);
      }
      return result.json();
    })
    .then((json) => {
      const newVersion = `${json["version"]}`;
      if (currentVersion < Number(json["version"])) {
        showUpdate(main, newVersion);
      }
    })
    .catch((error) => {
      console.error("Error checking for updates:", error);
    });
}
