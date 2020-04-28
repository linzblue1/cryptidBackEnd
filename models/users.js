const db = require("./conn");


class Users {
  constructor(id, username, password, email, email_verified, name) {
    this.is = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.email_verified = email_verified;
    this.name = name;
  }

  async save() {
    try {
      const response = await db.one(
        `INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING id;`,
        [this.username, this.email, this.password]
      );
      console.log("user was created with id:", response.id);
      return response;
    } catch (err) {
      return err.message;
    }
  }
  async newUser() {
    try {
      const response = await db.one(
        "INSERT INTO users (username, email, password) VALUES ($3, $2, $1) RETURNING id;",
        [this.email, this.username, this.password]
      );
      return response;
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }

  async userLogin() {
    try {
      const response = await db.one(`SELECT * FROM users WHERE email = $1;`, [
        this.email,
      ]);
      console.log("response is", response);
      const isValid = this.checkpassword(response.password);
      if (!!isValid) {
        const { id, name } = response;
        return { isValid, id, name };
      } else {
        return { isValid };
      }
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }
}

module.exports = Users;
