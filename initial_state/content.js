var Blog = require("../models/blog"),
    IndexContent = require("../models/indexContent"),
    BlogDetailContent = require("../models/blogDetailContent"),
    TemplateContent = require("../models/templateContent"),
    Good      = require("../models/good"),
    handler = require("../data_handler");

module.exports = async function() {
  try {
     const indexContent = handler.indexContents();

     try {
        const templateContent = handler.templateContents();

        try {
           const blogDetailContent = handler.blogDetailContents();

           try {
              const allBlogs = await handler.findByRecentBlogs(20);
              const recentGoods = await Good.find(
               { postedTime: { $lt: Date.now() } },
               {},
               { sort: { postedTime: -1 }, limit: 20 }).exec();
              const filterGoods = await Good.find(
                 {},
                 {},
                 { sort: { rating: -1 }, limit: 10 }).exec();
               
                 //await Blog.find(
                 //{ postedTime: { $lt: Date.now() } },
                 //{},
                 //{ sort: { postedTime: -1 }, limit: 20 }).exec();

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
                       "blogDetail": {
                          "content": {},
                          "error": null,
                          "loading": false
                       }
                    },
                    "form": {}
                 };
                 initialState.blogs.blogsList.blogs = allBlogs;
                 initialState.goods.recentGoods.goods = recentGoods;
                 initialState.goods.filterGoods.goods = filterGoods;
                 initialState.contents.index.content = indexContent;
                 initialState.contents.template.content = templateContent;
                 initialState.contents.blogDetail.content = blogDetailContent;

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