var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
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
