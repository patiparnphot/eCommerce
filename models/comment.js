var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    rating: String,
    createdAt: { type: Date, default: Date.now },
    rater: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
   }
});

module.exports = mongoose.model("Comment", commentSchema);
