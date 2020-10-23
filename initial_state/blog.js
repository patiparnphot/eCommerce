var moment  = require("moment-timezone"),
    Blog = require("../models/blog"),
    handler = require("../data_handler");

module.exports = async function(slug) {
  let title = slug.toLowerCase();
  
  try {
     let currentlyBlog = await handler.findByBlogName(title);

     try {
        let nextBlog = await handler.findByNextBlog(title);
        if (!nextBlog) nextBlog = currentlyBlog;
        //console.log(nextBlog);

        try {
           let prevBlog = await handler.findByPrevBlog(title);
           if (!prevBlog) prevBlog = currentlyBlog;
           //console.log(prevBlog);

           try {
              let recentBlogs = await handler.findByRecentBlogs(4);
              //console.log(recentBlogs);
              let postedTime
              let postedDuration = "";
              let recentPost = [];
              for (let i = 0; i < recentBlogs.length; i++) {
                 postedTime = recentBlogs[i].postedTime;
                 let diff = Date.now() - postedTime;
                 let minutesDiff = Math.floor(diff/1000/60);
                 // console.log(moment.duration(now.diff(postedTime)).minutes());
                 if (minutesDiff <= 60) {
                    postedDuration = minutesDiff + " Minutes ago";
                 } else if (minutesDiff <= 1440) {
                    let hoursDiff = Math.floor(diff/1000/60/60);
                    postedDuration = hoursDiff + " Hours ago";
                 } else {
                    postedDuration = moment(postedTime).tz('Asia/Bangkok').format("MMM Do YYYY");
                 }
                 // console.log(postedDuration);
                 recentPost.push({
                    'id': recentBlogs[i].id,
                    'image': recentBlogs[i].image,
                    'slug' : recentBlogs[i].slug,
                    'title': recentBlogs[i].title,
                    'postedDuration': postedDuration
                 });
              }
           
              try {
                 let blogDetail = {};
                 blogDetail = {
                    'id': currentlyBlog.id,
                    'descriptionHtml': currentlyBlog.descriptionHtml,
                    'titleHtml': currentlyBlog.titleHtml,
                    'image': currentlyBlog.image,
                    'slug': currentlyBlog.slug,
                    'title': currentlyBlog.title,
                    'text': currentlyBlog.text,
                    'type': currentlyBlog.type,
                    'author': currentlyBlog.author,
                    'postedTime': currentlyBlog.postedTime,
                    'prevBlog': prevBlog,
                    'nextBlog': nextBlog,
                    'recentBlogs': recentPost
                 };
                 console.log(blogDetail);
                 return({
                    'slug': currentlyBlog.slug,
                    'state': blogDetail
                 });

              } catch (err) {
                 return 'error occur at combineBlog';
              }
           } catch (err) {
              return 'error occur at recentBlogs';
           }

        } catch (err) {
           return 'error occur at prevBlog';
        }

     } catch (err) {
        return 'error occur at nextBlog';
     }

  } catch (err) {
     return 'error occur at currentlyBlog';
  }
    
}