var express = require("express");
var router = express.Router();

const models = require("../models/models");

const Vid = models.Vid;
const Admin = models.Admin;

router.get("/", function(req, res, next) {
  Vid.find({ status: "current" }, function(err, data) {
    Admin.find({ user: "admin" }, function(err, admin) {
      res.render("index", {
        vid: data,
        adminData: admin[0]
      });
    });
  }).sort({ datetosort: -1 });
});

router.get("/login", function(req, res) {
  res.render("login", { title: "login" });
});

router.post("/login", function(req, res) {
  var pw = req.body.password;
  Admin.findOne({ user: "admin" }, "password", function(err, result) {
    if (result["password"] == pw) {
      Admin.updateOne({ user: "admin" }, { loggedIn: true }, function(
        err,
        result
      ) {
        if (err) throw err;

        res.redirect("/admin");
      });
    } else {
      Admin.updateOne({ user: "admin" }, { loggedIn: false }, function(
        err,
        result
      ) {
        if (err) throw err;

        res.redirect("/login");
      });
    }
  });
});

router.get("/admin", function(req, res) {
  Vid.find(function(err, data) {
    Admin.find(function(err, admin) {
      if (admin[0]["loggedIn"] == true) {
        res.render("admin", { title: "admin", vid: data, adminData: admin[0] });
      } else {
        res.redirect("/login");
      }
    });
  });
});

router.post("/admin", function(req, res) {
  var clicked = req.body.clicked;
  if (clicked == "Add") {
    var u = new models.Vid({
      name: req.body.title,
      postedat: req.body.postedat,
      datetosort: req.body.postedat,
      link: req.body.link,
      info: req.body.description,
      status: req.body.status
    });

    u.save(function(err, vid) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(vid);
      res.redirect("/admin");
    });
  } else if (clicked == "Update") {
    var pw = req.body.password;
    var repeat = req.body.repeat;
    var about = req.body.about;
    var instLink = req.body.ilink;
    var twitLink = req.body.tlink;

    if (pw == repeat) {
      Admin.updateOne(
        { user: "admin" },
        { password: pw, about: about, twitLink: twitLink, instLink: instLink },
        function(err, result) {
          if (err) throw err;

          res.redirect("/admin");
        }
      );
    } else {
      alert("passwords does not match!");
    }
  }
});

router.get("/find", function(req, res) {
  Vid.remove({ _id: "600b6b35164cb8ba593cb259" }, function(err, result) {
    res.send(result);
  });
});

router.get("/delete/:id", function(req, res) {
  var aid = req.params.id;
  Vid.remove({ _id: aid }, function(err, result) {
    res.redirect("/admin");
  });
});

router.get("/toggle/:id", function(req, res) {
  var aid = req.params.id;
  Vid.findOne({ _id: aid }, "status", function(err, result) {
    if (result["status"] == "current") {
      Vid.updateOne({ _id: aid }, { status: "archive" }, function(err, result) {
        if (err) throw err;

        res.redirect("/admin");
      });
    } else {
      Vid.updateOne({ _id: aid }, { status: "current" }, function(err, result) {
        if (err) throw err;

        res.redirect("/admin");
      });
    }
  });
});

router.get("/archive", function(req, res, next) {
  Vid.find({ status: "archive" }, function(err, data) {
    res.render("archive", {
      vid: data,
      beebe: "testy est"
    });
  }).sort({ datetosort: -1 });
});

router.get("/logout", function(req, res, next) {
  Admin.updateOne({ user: "admin" }, { loggedIn: false }, function(
    err,
    result
  ) {
    if (err) throw err;

    res.redirect("/");
  });
});

module.exports = router;
