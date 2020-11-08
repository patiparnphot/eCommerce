var mongoose = require("mongoose");

var goodObject = {
   titleHtml: String,
   descriptionHtml: String,
   slug: String,
   title: String,
   description: String,
   image: String,
   category: String,
   rating: String,
   ratingAmount: String,
   ratierAmount: String,
   postedTime: Date,
   isAvailable: Boolean,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
};

var goodSchema = new mongoose.Schema(goodObject);

module.exports = mongoose.model("Good", goodSchema);

//module.exports = goodObject;
