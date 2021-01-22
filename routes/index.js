var express = require("express");
var router = express.Router();

const models = require("../models/models");

const Vid = models.Vid;

/* GET home page. */

router.get("/", function(req, res, next) {
  Vid.find(function(err, data) {
    console.log("this is try");
    res.render("index", {
      vid: data,
      beebe: "testy est"
    });
  });
});

router.get("/admin", function(req, res) {
  res.render("admin", { title: "admin" });
});

router.post("/admin", function(req, res) {
  var u = new models.Vid({
    // Note: Calling the email form field 'username' here is intentional,
    //    passport is expecting a form field specifically named 'username'.
    //    There is a way to change the name it expects, but this is fine.
    name: req.body.title,
    info: req.body.description
  });

  u.save(function(err, vid) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(vid);
    res.send("success");
  });
  /* console.log(req.body.title);
  console.log(req.body.description);
  res.send("Post page"); */
});

router.get("/multiplicity", function(req, res, next) {
  res.render("carousel", { title: "multi" });
});

router.get("/musicandchill", function(req, res, next) {
  res.render("mc", { title: "multi" });
});

router.get("/visualtool", function(req, res, next) {
  res.render("tool", { title: "multi" });
});

router.get("/shell", function(req, res, next) {
  res.render("shell", { title: "multi" });
});

router.get("/moviebase", function(req, res, next) {
  res.render("base", { title: "multi" });
});

router.get("/oops", function(req, res, next) {
  res.render("oops", { title: "multi" });
});

router.get("/info", function(req, res, next) {
  res.render("generic", { title: "Generic" });
});

router.get("/elements", function(req, res, next) {
  res.render("elements", { title: "Elements" });
});

module.exports = router;
