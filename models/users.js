const db = require("./conn");

class Users {
  constructor(id, username, password, email, email_verified) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.email_verified = email_verified;
  }

  static async newUser() {
    try {
      const response = await db.one(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email, password;",
        [this.email, this.username, this.password]
      );
      return response;
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }

  static async userLogin() {
    try {
      const response = await db.one(
        `SELECT * FROM users WHERE username = $1;`,
        [this.username]
      );
      console.log("response is", response);
      return response;
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }
}

module.exports = Users;
