var mongoose = require("mongoose");

var blogDetailContentSchema = new mongoose.Schema({
   headerLine: String,
   homeBreadcrumb: String,
   blogDetailBreadcrumb: String,
   previousBlogNav: String,
   NxtBlgNav: String,
   categoryHead: String,
   recentPostHead: String
});

module.exports = mongoose.model("BlogDetailContent", blogDetailContentSchema);