var mongoose = require("mongoose");

var goodObject = {
   titleHtml: String,
   descriptionHtml: String,
   slug: { type: String, unique: true, required: true },
   title: { type: String, required: true },
   description: String,
   options: [
      {
         cost: Number,
         key: String,
         aroma: Number,
         acidity: Number,
         fruity: Number
      }
   ],
   specificOptions: [ String ],
   image: String,
   category: String,
   rating: String,
   ratingAmount: String,
   raterAmount: String,
   postedTime: { type: Date, default: Date.now },
   isAvailable: { type: Boolean, default: true },
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
