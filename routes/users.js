var express = require("express");
var router = express.Router();
const models = require("../models/models");

const Vid = models.Vid;
/* GET users listing. */
router.get("/", function(req, res, next) {
  Vid.find({}, function(err, data) {
    console.log("this is data");
    res.send(data);
    res.render("newtry", {
      vid: JSON.stringify(data),
      beebe: "testy test teest"
    });
  });
});

module.exports = router;
