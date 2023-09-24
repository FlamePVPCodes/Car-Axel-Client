import "./notification.ts.less";
import { Component, createElement } from "../UILib";

export default class Notification implements Component {
  parent: HTMLElement;
  notification: HTMLElement | null = null;
  title: string;
  body: string;

  constructor(parent: HTMLElement, title: string, body: string, button?: { text: string; fn: () => void }) {
    this.parent = parent;
    this.title = title;
    this.body = body;

    this.render();

    if (button) {
      const buttonElement = createElement("button", this.notification!, {
        className: "cac__notification__button",
        innerHTML: button.text,
      });
      buttonElement.onclick = () => button.fn();
    }
  }

  render() {
    this.notification = createElement("div", this.parent, { className: "cac__notification" });

    createElement("h1", this.notification, { className: "cac__notification__header", innerHTML: this.title });
    createElement("p", this.notification, { className: "cac__notification__body", innerHTML: this.body });

    const dismissButton = createElement("button", this.notification, {
      className: "cac__notification__button",
      innerHTML: "Dismiss",
    });
    dismissButton.onclick = () => this.dismiss();
  }

  display(ms: number = 500) {
    if (this.notification) {
      setTimeout(() => {
        this.dismiss();
      }, ms);
    }
  }

  private dismiss() {
    if (this.notification) {
      this.notification.remove();
    }
  }
}
