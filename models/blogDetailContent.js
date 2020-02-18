var mongoose = require("mongoose");

var blogDetailContentSchema = new mongoose.Schema({
   headerLine: String,
   homeBreadcrumb: String,
   blogDetailBreadcrumb: String,
   previousBlogNav: String,
   NextBlogNav: String,
   categoryHead: String,
   recentPostHead: String
});

module.exports = mongoose.model("BlogDetailContent", blogDetailContentSchema);