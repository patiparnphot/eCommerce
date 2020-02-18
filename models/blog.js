var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
   title: String,
   text: String,
   image: String,
   type: String,
   author: {
      image: String,
      name: String,
      description: String
   },
   postedTime: Date
});

module.exports = mongoose.model("Blog", blogSchema);