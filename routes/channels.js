const express = require("express");
const router = express.Router();
const Channels = require("../models/Channels");
const bcrypt = require("bcrypt");

const loginPost = async (req, res, next) => {
    const { channel, password } = req.body;
    const channelInstance = await Channels.channelLogin(channel);
    const isValid = channelInstance.checkpassword(password);
    console.log('isValid',isValid);
    if (isValid) {
        req.session.is_logged_in = isValid;
        req.session.channel_id = channelInstance.id;
        req.session.name = channelInstance.channel;
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
}

const putChannel = async (req, res) => {
    const { channel, password } = req.body;
    const channelInstance = await Channels.add(channel, password);
    if(channel === channelInstance.channel){
        console.log("GOOD STATUS")
        res.sendStatus(200);
    }else {
        res.sendStatus(403);
    }
}


router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
})
// /* GET home page. */
// router.get("/", function (req, res) {
//   res.sendStatus(200);
// });

// router.get("/login", async function (req, res) {
//   const resultData = await usersModel.userLogin();
//   res.json(resultData).status(200);
// });

// router.post("/login", async function (req, res) {
//   const { username, password } = req.body;

//   const user = new usersModel(null, null, username, password);

//   const loginResponse = await user.userLogin();
//   res.json(loginResponse).status(200);
// });

// router.get("/signup", async (req, res) => {
//   const resultData = await usersModel.newUser();
//   res.json(resultData).status(200);
// });




// router.post("/signup", async (req, res) => {
//   const { username, email } = req.body;
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(req.body.password, salt);

//   // bcrypt.genSalt(saltRounds, function (err, salt) {
//   //   if (err) {
//   //     throw err;
//   //   } else {
//   //     bcrypt.hash(password, salt, function (err, password) {
//   //       if (err) {
//   //         throw err;
//   //       } else {
//   //         // console.log(hash)
//   //         console.log(password);
//   //       }
//   //     });
//   //   }
//   // });

//   const user = new usersModel(null, email, username, hash);
//   user.newUser().then(() => {
//     res.sendStatus(200);
//   });
// });

// router.get("/logout", async (req, res) => {
//   req.session.destroy();
// });

module.exports = { loginPost, putChannel};