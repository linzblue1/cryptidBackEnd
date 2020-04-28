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
  const { username, password } = req.body;
  const user = new usersModel(null, null, username, password);
  const loginResponse = await user.userLogin();
  res.json(loginResponse).status(200);
});

router.get("/signup", async (req, res) => {
  const resultData = await usersModel.newUser();
  res.json(resultData).status(200);
});

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const user = new usersModel(null, email, username, password);
  user.newUser().then(() => {
    res.sendStatus(200);
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
});

module.exports = router;
