const express = require("express");
const router = express.Router();
const usersModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

router.get("/login", async function (req, res, next) {
  const resultData = await usersModel.userLogin();
  res.json(resultData).status(200);
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  const user = new usersModel(null, null, email, password);
  const loginResponse = await user.userLogin();

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
