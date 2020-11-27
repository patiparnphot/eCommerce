var Blog = require("../models/blog"),
    IndexContent = require("../models/indexContent"),
    BlogDetailContent = require("../models/blogDetailContent"),
    TemplateContent = require("../models/templateContent");

module.exports = async function() {
  try {
     const indexContent = await IndexContent.findOne({}).exec();

     try {
        const templateContent = await TemplateContent.findOne({}).exec();

        try {
           const blogDetailContent = await BlogDetailContent.findOne({}).exec();

           try {
              const allBlogs = await Blog.find(
                 { postedTime: { $lt: Date.now() } },
                 {},
                 { sort: { postedTime: -1 }, limit: 20 }).exec();

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