var express = require("express");
var router = express.Router();

const models = require("../models/models");

const Vid = models.Vid;

/* GET home page. */
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var Annie = makeid(10);
const secretString = encodeURIComponent(Annie);

console.log(makeid(5));
router.get("/", function(req, res, next) {
  Vid.find(function(err, data) {
    console.log("this is try");
    res.render("index", {
      vid: data,
      beebe: "testy est"
    });
  }).sort({ _id: -1 });
  /* .limit(2) */
});

router.get("/login", function(req, res) {
  res.render("login", { title: "login" });
});

router.post("/login", function(req, res) {
  var pw = req.body.password;
  if (pw == "adminpassword") {
    res.redirect("/admin/" + secretString);
  } else {
    res.send("Wrong Password");
  }
});

router.get("/admin/:secretString", function(req, res) {
  var te = req.params.secretString;
  console.log(te);
  console.log(Annie);
  if (te == Annie) {
    Vid.find(function(err, data) {
      console.log("admin render vids");
      res.render("admin", { title: "admin", vid: data });
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/admin/:secretString", function(req, res) {
  var u = new models.Vid({
    name: req.body.title,
    postedat: req.body.postedat,
    datetosort: req.body.postedat,
    link: req.body.link,
    info: req.body.description
  });

  u.save(function(err, vid) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(vid);
    res.redirect("/");
  });
  /* console.log(req.body.title);
  console.log(req.body.description);
  res.send("Post page"); */
});

router.get("/find", function(req, res) {
  Vid.remove({ _id: "600b6b35164cb8ba593cb259" }, function(err, result) {
    res.send(result);
  });
});

router.get("/delete/:id", function(req, res) {
  var aid = req.params.id;
  Vid.remove({ _id: aid }, function(err, result) {
    res.redirect("/login");
  });
});

router.get("/moviebase", function(req, res, next) {
  res.render("base", { title: "multi" });
});

module.exports = router;
