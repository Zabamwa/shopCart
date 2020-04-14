import { configure, observable, action } from "mobx";
import i18n from "../config/i18n";

configure({ enforceActions: "observed" });

class AppStore {
  // STORE
  @observable locale;

  @observable initialized = false;

  // ACTIONS

  @action
  getInitialLocaleAction() {
    const locale = localStorage.getItem("@Locale");
    if (locale != null) {
      this.setLocaleAction(locale);
    } else {
      this.setLocaleAction("pl");
    }
    this.initialized = true;
  }

  @action
  setLocaleAction(locale) {
    localStorage.setItem("@Locale", locale);
    i18n.changeLanguage(locale);

    this.locale = locale;
  }
}

export default new AppStore();
