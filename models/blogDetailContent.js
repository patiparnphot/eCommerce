var mongoose = require("mongoose");

var blogDetailContentObject = {
   headerLine: String,
   homeBreadcrumb: String,
   blogDetailBreadcrumb: String,
   previousBlogNav: String,
   NxtBlgNav: String,
   categoryHead: String,
   recentPostHead: String
};

var blogDetailContentSchema = new mongoose.Schema(blogDetailContentObject);

module.exports = mongoose.model("BlogDetailContent", blogDetailContentSchema);

//module.exports = blogDetailContentObject;