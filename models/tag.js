var mongoose = require("mongoose");

var tagObject = {
   titleHtml: String,
   descriptionHtml: String,
   tagType: String,
   title: { type: String, unique: true, required: true },
   text: String,
   postedTime: { type: Date, default: Date.now }
};

var tagSchema = new mongoose.Schema(tagObject);

module.exports = mongoose.model("Tag", tagSchema);

//module.exports = goodObject;
