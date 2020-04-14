import { configure, observable, action } from "mobx";

configure({ enforceActions: "observed" });

class OrderStore {
  // STORE
  @observable user = {};

  @observable send = false;
  @observable add = true;

  // ACTIONS

  @action
  editModeAction = (send) => {
    this.send = send;
  };

  @action
  addModeAction = (add) => {
    this.add = add;
  };

  @action
  setUser = (user) => {
    this.user = user;
  };

  @action
  addUser = (user) => {
    this.user = user;
  };

  @action
  addUserAction = (data) => {
    this.addUser(data);
    this.editModeAction(true);
    this.addModeAction(false);
    return true;
  };

  @action
  resetUser = () => {
    this.setUser({
      id: "",
      firstName: "",
      lastName: "",
      companyName: "",
      companyNip: "",
      country: "",
      street: "",
      addressNumber: "",
      city: "",
      phoneNumberPrefix: "",
      phoneNumber: "",
    });
  };
}

export default new OrderStore();
