const db = require("./conn");
const bcrypt = require("bcrypt");

class Users {
  constructor(id, username, password, email, email_verified) {
    this.is = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.email_verified = email_verified;
  }
  checkpassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
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

      const response = await db.one(`SELECT * FROM users WHERE username = $1;`, [
        this.username
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
