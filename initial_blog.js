var moment  = require("moment-timezone"),
    Blog = require("../models/blog");

module.exports = async function(title) {
  try {
     const currentlyBlog = await Blog.findOne({ title: title }).exec();
     //console.log(currentlyBlog);

     try {
        let nextBlog;
        nextBlog = await Blog.findOne(
           { postedTime: { $gt: currentlyBlog.postedTime } },
           {title: 1, image: 1},
           { sort: { postedTime: 1 }, limit: 1 }).exec();
        if (!nextBlog) nextBlog = currentlyBlog;
        //console.log(nextBlog);

        try {
           let prevBlog;
           prevBlog = await Blog.findOne(
              { postedTime: { $lt: currentlyBlog.postedTime } },
              {title: 1, image: 1},
              { sort: { postedTime: -1 }, limit: 1 }).exec();
           if (!prevBlog) prevBlog = currentlyBlog;
           //console.log(prevBlog);

           try {
              const recentBlogs = await Blog.find(
                 { postedTime: { $lt: Date.now() } },
                 {title: 1, image: 1, postedTime: 1},
                 { sort: { postedTime: -1 }, limit: 4 }).exec();
              //console.log(recentBlogs);
              let postedTime
              let postedDuration = "";
              let recentPost = [];
              for (let i = 0; i < recentBlogs.length; i++) {
                 postedTime = recentBlogs[i].postedTime;
                 let diff = Date.now() - currentlyBlog.postedTime;
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
                    '_id': recentBlogs[i]._id,
                    'image': recentBlogs[i].image,
                    'title': recentBlogs[i].title,
                    'postedDuration': postedDuration
                 });
              }
           
              try {
                 let blogDetail = {};
                 blogDetail = {
                    '_id': currentlyBlog._id,
                    'descriptionHtml': currentlyBlog.descriptionHtml,
                    'titleHtml': currentlyBlog.titleHtml,
                    'image': currentlyBlog.image,
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
                    'title': currentlyBlog.title,
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