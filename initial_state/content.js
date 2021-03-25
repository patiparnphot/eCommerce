var Blog    = require("../models/blog"),
    Content = require("../models/content"),
    Good    = require("../models/good"),
    Author  = require("../models/author"),
    handler = require("../data_handler");

module.exports = async function() {
   try {
      const indexContent = await Content.findOne(
         { contentType: "index" },
         {},
         { sort: { postedTime: -1 }, limit: 1 }
      ).exec();

      try {
         const templateContent = await Content.findOne(
            { contentType: "template" },
            {},
            { sort: { postedTime: -1 }, limit: 1 }
         ).exec();

         const contactUsContent = await Content.findOne(
            { contentType: "contactus" },
            {},
            { sort: { postedTime: -1 }, limit: 1 }
         ).exec();

         try {
            const blogDetailContent = await Content.findOne(
               { contentType: "blogdetail" },
               {},
               { sort: { postedTime: -1 }, limit: 1 }
            ).exec();

            const goodDetailContent = await Content.findOne(
               { contentType: "gooddetail" },
               {},
               { sort: { postedTime: -1 }, limit: 1 }
            ).exec();

            const cartContent = await Content.findOne(
               { contentType: "cart" },
               {},
               { sort: { postedTime: -1 }, limit: 1 }
            ).exec();

            try {
               const allBlogs = await Blog.find(
                  { postedTime: { $lt: Date.now() } },
                  {},
                  { sort: { postedTime: -1 }, limit: 20 }
               ).exec();
               
               const recentGoods = await Good.find(
                  { postedTime: { $lt: Date.now() } },
                  {},
                  { sort: { postedTime: -1 }, limit: 20 }
               ).exec();

               const filterGoods = await Good.find(
                  {},
                  {},
                  { sort: { rating: -1 }, limit: 10 }
               ).exec();

               const authorBlog = await Author.findOne(
                  {},
                  {},
                  { sort: { postedTime: -1 }, limit: 1 }
               ).exec();

               try {
                  let initialState = {
                     "blogs": {
                        "blogsList": {
                           "blogs": [],
                           "error": null,
                           "loading": false
                        },
                        "newBlog": {
                           "blog": null,
                           "error": null,
                           "loading": false
                        },
                        "activeBlog": {
                           "blog": null,
                           "error": null,
                           "loading": false
                        },
                        "deletedBlog": {
                           "blog": null,
                           "error": null,
                           "loading": false
                        },
                        "authorBlog": {
                           "data": null,
                           "error": null,
                           "loading": false
                        }
                     },
                     "goods": {
                        "recentGoods": {
                              "goods": [],
                              "error": null,
                              "loading": false
                           },
                           "popularGoods": {
                              "goods": [],
                              "error": null,
                              "loading": false 
                           },
                           "filterGoods": {
                              "goods": [],
                              "error": null,
                              "loading": false
                           },
                           "activeGood": {
                              "good": null,
                              "error": null,
                              "loading": false
                           },
                           "incartGoods": {
                              "goods": [],
                              "error": null,
                              "loading": false
                           }
                        },
                     "contents": {
                        "index": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "template": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "contactUs": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "blogDetail": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "goodCategory": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "goodDetail": {
                           "content": {},
                           "error": null,
                           "loading": false
                        },
                        "cart": {
                           "content": {},
                           "error": null,
                           "loading": false
                        }
                     },
                     "form": {}
                  };
                  initialState.blogs.blogsList.blogs = allBlogs;
                  initialState.blogs.authorBlog.data = authorBlog;
                  initialState.goods.recentGoods.goods = recentGoods;
                  initialState.goods.filterGoods.goods = filterGoods;
                  initialState.contents.index.content = indexContent.content;
                  initialState.contents.template.content = templateContent.content;
                  initialState.contents.contactUs.content = contactUsContent.content;
                  initialState.contents.blogDetail.content = blogDetailContent.content;
                  initialState.contents.goodDetail.content = goodDetailContent.content;
                  initialState.contents.cart.content = cartContent.content;

                  return(initialState);

               } catch (err) {
                  return 'error occur at combineContent';
               }
            } catch (err) {
               return 'error occur at allBlogs';
            }

         } catch (err) {
            return 'error occur at blogDetailContent';
         }

      } catch (err) {
         return 'error occur at templateContent';
      }

   } catch (err) {
      return 'error occur at indexContent';
   }
    
}