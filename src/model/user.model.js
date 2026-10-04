export const users = [];

export default class userModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static allUsers() {
    return users;
  }

  static addUser(name, email, password) {
    const cleanEmail = email.trim().toLowerCase();

    // refuse if this email is already registered
    const exists = users.find((user) => user.email === cleanEmail);
    if (exists) return null;

    const id = users.length + 1;
    const newUser = new userModel(id, name.trim(), cleanEmail, password);
    users.push(newUser);
    return newUser;
  }

  static loginUser(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    return users.find(
      (user) => user.email === cleanEmail && user.password === password,
    );
  }
}
