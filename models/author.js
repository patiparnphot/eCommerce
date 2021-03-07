var mongoose = require("mongoose");

var authorObject = {
   name: { type: String, required: true },
   description: String,
   image: String,
   postedTime: { type: Date, default: Date.now }
};

var authorSchema = new mongoose.Schema(authorObject);

module.exports = mongoose.model("Author", authorSchema);

//module.exports = goodObject;
