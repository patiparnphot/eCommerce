var express   = require("express"),
    router    = express.Router(),
    moment    = require("moment-timezone"),
    fs        = require("fs"),
    Blog      = require("../models/blog"),
    blogState = require("../initial_state/blog");
    // middleware = require("../middleware");

var handler = require('../data_handler');

// var preAuthenticate = function (req,res,next){
//     console.log(JSON.stringify(req.body));
//     return next();
// };


//PRELOADEDBLOGDATA - get preloaded blog data
router.get("/preloadedData", function(req, res, next){
    res.json(
      {
        "blogAmount": handler.howManyBlogs(),
        "blogCategories": handler.blogCategories()
      }
    );
});

//PAGINATIONBLOG - get pagination blogs
router.get("/pagination/:start/:end", async function(req, res, next){
    let blogArray = await handler.findByPaginationBlogs(req.params.start, req.params.end);
    res.json(blogArray);
});

//BLOGS - get all blogs
router.get("/", async function(req, res, next){
    let recentBlogs = await handler.findByRecentBlogs(20);
    res.json(recentBlogs);
    //Blog.find(
    //    { postedTime: { $lt: Date.now() } },
    //    {},
    //    { sort: { postedTime: -1 }, limit: 20 }, function(err, allBlogs){
    //        if(err) return next(err);
    //        res.json(allBlogs);
    //    }
    //);
});

//INITIALSTATE - update JSON file of initialState blog
router.get("/updateJsonFile", async function(req, res, next) {
    try {
        let allBlogs = await handler.listOfBlogName();
        if (!allBlogs) return next("cannot get list of blog name");
        let blogStateArr = [];
        if (Array.isArray(allBlogs) && (allBlogs.length > 0)) {
            for (let i = 0; i < allBlogs.length; i++) {
                let blogTitle = allBlogs[i];
                blogStateArr.push(blogState(blogTitle));
            };
        };
        let finalBlogStateArr = await Promise.all(blogStateArr);
        let blogStateJS = `module.exports = function(blogTitle) { `;
        for (let j = 0; j < finalBlogStateArr.length; j++) {
            if (j == 0) {
                blogStateJS += `if ( blogTitle == `;
            } else {
                blogStateJS += `else if ( blogTitle == `;
            }
            blogStateJS += JSON.stringify(finalBlogStateArr[j].slug);
            blogStateJS += ` ) { return `;
            blogStateJS += JSON.stringify(finalBlogStateArr[j].state);
            blogStateJS += `; } `;
        };
        blogStateJS += `else { return undefined; } }`;
        if (fs.existsSync("./initial_state/initialBlogState.js")) {
            fs.unlink("./initial_state/initialBlogState.js", function(err) {
                if (err) return next(err);
                console.log("The Javascript file which contains initial blog state is deleted !!!");
            });
        };
        fs.writeFile("./initial_state/initialBlogState.js", blogStateJS, function(err) {
            if (err) return next(err);
            console.log("The Javascript file which contains initial blog state is written !!!");
        });
        res.send("The Javascript file which contains initial blog state is updated !!!");
    } catch (err) {
        res.send(err);
    }
})

//ACTIVE BLOG - get a single blog
router.get("/active/:title", async function(req, res, next) {
  if(!req.params.title || typeof(req.params.title) != "string") next("title is invalid");
  let title = req.params.title.toLowerCase();
  console.log("title: ", title);
  let currentlyBlog = await handler.findByBlogName(title);
  res.json(currentlyBlog);
})

//BLOG - get the data of blog page
router.get("/:title", async function(req, res, next) {
  if(!req.params.title || typeof(req.params.title) != "string") next("title is invalid");
  let title = req.params.title.toLowerCase();
  // console.log("title: ", title);
  let currentlyBlog = await handler.findByBlogName(title);
  let nextBlog = await handler.findByNextBlog(title);
  let prevBlog = await handler.findByPrevBlog(title);
  let recentBlogs = await handler.findByRecentBlogs(4);

  // console.log(currentlyBlog);
  // console.log("Next blog: " + nextBlog);
  if (!nextBlog) {nextBlog = currentlyBlog;}
  // console.log("Previous blog: " + prevBlog);
  if (!prevBlog) {prevBlog = currentlyBlog;}
  // console.log("Recent Post: " + recentBlogs);
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
          'title': recentBlogs[i].title,
          'slug' : recentBlogs[i].slug,
          'postedDuration': postedDuration
      });
  }
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
  // console.log(blogDetail);
  res.json(blogDetail);
});

//CREATE - add a new idol to db
router.post("/create", async function(req, res, next) {
    const newBlog = await handler.createNewBlog(req.body.newBlog);
    if (!newBlog || newBlog == {}) return next("create fail");
    res.json(newBlog);
});

//UPDATE - edit a blog
router.put("/edit/:id", async function(req, res, next) {
  const editedBlog = await handler.editBlog(req.params.id, req.body.editBlog);
  if (!editedBlog || editedBlog == {} || editedBlog.id != req.params.id) return next("edit fail");
  res.json(editedBlog);
});

// //DESTROY - delete a idol from db
// router.delete("/:id", middleware.checkUserIdol, function(req, res, next) {
//   Idol.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return next(err);
//   });
// });

module.exports = router;