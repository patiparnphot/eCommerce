var mongoose = require("mongoose");

var blogObject = {
   titleHtml: String,
   descriptionHtml: String,
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
};

var blogSchema = new mongoose.Schema(blogObject);

module.exports = mongoose.model("Blog", blogSchema);

//module.exports = blogObject;