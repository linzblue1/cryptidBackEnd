const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  usersModel = require("../models/users");

router.get("/login", async function (req, res, next) {
  const resultData = await usersModel.userLogin();
  res.json(resultData).status(200);
});
router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  const user = new usersModel(null, null, email, password);
  const loginResponse = await user.userLogin();
  // console.log('login response is', loginResponse);
  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.user_id = loginResponse.id;
    req.session.name = loginResponse.name;
  } else {
    res.sendStatus(403);
  }
});

router.get("/signup", async (req, res) => {
  const resultData = await usersModel.newUser();
  res.json(resultData).status(200);
});

router.post("/signup", async (req, res) => {
  const { name, email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new usersModel(null, name, email, username, hash);
  user.save().then(() => {
    res.sendStatus(200);
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
});

module.exports = router;
