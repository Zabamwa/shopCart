export default class UserService {
  static async addUser(data, userList) {
    userList.push(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: userList });
      }, 1000);
    });
  }

  static async getUser(data, userList) {
    const user = userList.find((user) => user.id === Number(data));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: user });
      }, 1000);
    });
  }

  static async editUser(data, userList) {
    const user = userList.find((user) => user.id === Number(data.id));
    const index = userList.indexOf(user);
    userList.splice(index, 1);
    userList.unshift(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: userList });
      }, 1000);
    });
  }
}
