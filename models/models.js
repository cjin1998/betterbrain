var mongoose = require("mongoose");
let _ = require("lodash");

// Step 0: Remember to add your MongoDB information in one of the following ways!
if (!process.env.MONGODB_URI) {
  console.log("Error: MONGODB_URI is not set. Did you run source env.sh ?");
  process.exit(1);
}

var connect = process.env.MONGODB_URI;
mongoose.connect(connect, { useNewUrlParser: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database!"));

var vidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  postedat: {
    type: String,
    required: true
  },

  datetosort: {
    type: Date,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  info: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  img: {
    data: Buffer,
    contentType: String
  }
});

var adminSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  about: {
    type: String,
    required: true
  },

  twitLink: {
    type: String
  },

  instLink: {
    type: String
  },

  loggedIn: {
    type: Boolean
  }
});

var Vid = mongoose.model("vid", vidSchema);
var Admin = mongoose.model("admin", adminSchema);

module.exports = {
  Vid: Vid,
  Admin: Admin
};
