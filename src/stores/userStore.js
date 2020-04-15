import { configure, observable, action, toJS } from "mobx";
import userService from "../service/userService";

configure({ enforceActions: "observed" });

class UserStore {
  // STORE
  @observable userList = [];
  @observable user = {};
  @observable id = "";

  @observable send = false;
  @observable edit = false;
  @observable add = true;
  @observable pending = false;

  // ACTIONS

  @action
  pendingStart = () => {
    this.pending = true;
  };
  @action
  pendingEnd = () => {
    this.pending = false;
  };

  @action
  editModeAction = (send) => {
    this.send = send;
  };

  @action
  editModeUserAction = (edit) => {
    this.edit = edit;
  };

  @action
  addModeAction = (add) => {
    this.add = add;
  };

  @action
  addUser = (user) => {
    this.user = user;
  };

  @action
  setUser = (user) => {
    this.user = user;
  };

  @action
  setId = (id) => {
    this.id = id;
  };

  @action
  addUserAction = async (data) => {
    this.pendingStart();
    const result = await userService.addUser(data, this.userList);
    this.pendingEnd();
    this.addUser(result.data);
    this.editModeAction(true);
    this.addModeAction(false);
    return true;
  };

  @action
  editUserAction = async (data) => {
    this.pendingStart();
    const result = await userService.editUser(data, this.userList);
    this.pendingEnd();
    this.addUser(result.data);
    this.editModeAction(true);
    this.addModeAction(false);
    this.editModeUserAction(false);
    return true;
  };

  @action
  getUserAction = async (id) => {
    const result = await userService.getUser(id, this.userList);
    this.setUser(result.data);
  };
}

export default new UserStore();
