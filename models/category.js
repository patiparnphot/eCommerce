var mongoose = require("mongoose");

var categoryObject = {
   titleHtml: String,
   descriptionHtml: String,
   categoryType: String,
   title: { type: String, unique: true, required: true },
   text: String,
   options: [ String ],
   features: [ { type: Object } ],
   postedTime: { type: Date, default: Date.now }
};

var categorySchema = new mongoose.Schema(categoryObject);

module.exports = mongoose.model("Category", categorySchema);

//module.exports = goodObject;
