const express = require("express"),
  router = express.Router();

const {loginPost, putChannel} = require('./channels');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

router.post("/login",loginPost)
router.post("/putchannel", putChannel)

module.exports = router;
