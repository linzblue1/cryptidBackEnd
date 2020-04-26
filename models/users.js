const db = require('./conn');
const bcrypt = require('bcrypt');

class Users {
    constructor(id, username, password, email, email_verified, name ) {
        this.is = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.email_verified =email_verified;
        this.name = name;
    }
    checkpassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    async save() {
        try {
            const response = await db.one(`
                insert into users 
                    (name, email, password) 
                values 
                    ($1, $2, $3) 
                returning id
                `, [this.name, this.email, this.password]
                );
            console.log("user was created with id:", response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }
    async newUser() {
        try {
            const response = await db.one('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3) RETURNING id;', [this.name, this.email, this.username, this.password]);
            return response
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }

    async userLogin() {
        try {
            const response = await db.one(`SELECT id, name, password FROM users WHERE email = $1;`, [this.email]);
            console.log("response is", response);
            const isValid = this.checkpassword(response.password);
            if(!!isValid) {
                const {id, name} = response;
                return { isValid, id, name};
            } else {
                return {isValid};
            }
        } catch (error) {
            console.error('ERROR', error)
            return error
        }
    }
    
}

module.exports = Users
