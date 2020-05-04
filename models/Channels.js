const db = require("./conn");
const bcrypt = require('bcrypt');


class Channels {
  constructor(id, channel, password, ) {
    this.id = id;
    this.channel = channel;
    this.password = password;
  }
  checkpassword(password) {
    console.log('hashpass', this.password);
    return bcrypt.compareSync(password, this.password);
  }

  static add(channel, password) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const channelInstance = db.one(
        "INSERT INTO channels (channel, password) VALUES ($1, $2) RETURNING id, channel",
        [channel, hash]
      ).then(channelData => {
        return new Channels(
          channelData.id,
          channelData.channel
        )
      })
      return channelInstance
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }

  async getChannels() {
    try {
      const response = await db.many(
        "SELECT channel FROM channels"
      ).then((dataArray) => {
        return dataArray.map((data) => {
          return new Channels(data.id, data.channel)
        })
      })
      return response;
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  static channelLogin(channel) {
    try {
      console.log("channel login", channel)

      return db.one(`SELECT * FROM channels WHERE channel = $1`, [
        channel
      ]).then(channelData => {
        return new Channels(
          channelData.id,
          channelData.channel,
          channelData.password
        )
      })

      // if (isValid) {
      //   const { id, name } = response;
      //   return { isValid, id, channel };
      // } else {
      //   return { isValid };
      // }
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }
}

module.exports = Channels;
