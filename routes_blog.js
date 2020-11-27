var express   = require("express"),
    router    = express.Router(),
    moment    = require("moment-timezone"),
    fs        = require("fs"),
    Blog      = require("../models/blog"),
    blogState = require("../initial_state/blog");
    // middleware = require("../middleware");

// var preAuthenticate = function (req,res,next){
//     console.log(JSON.stringify(req.body));
//     return next();
// };


//BLOGS - get all blogs
router.get("/", function(req, res, next){
    Blog.find(
        { postedTime: { $lt: Date.now() } },
        {},
        { sort: { postedTime: -1 }, limit: 20 }, function(err, allBlogs){
            if(err) return next(err);
            res.json(allBlogs);
        }
    );
});

//INITIALSTATE - update JSON file of initialState blog
router.get("/updateJsonFile", async function(req, res, next) {
try {
    Blog.find({}, {title: 1, _id: 0}, {}, async function(err, allBlogs){
        if (err) return next(err);
        let blogStateArr = [];
        if (Array.isArray(allBlogs) && (allBlogs.length > 0)) {
            for (let i = 0; i < allBlogs.length; i++) {
                let blogTitle = allBlogs[i].title;
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
            blogStateJS += JSON.stringify(finalBlogStateArr[j].title);
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
    });
} catch (err) {
res.send(err);
}
})

//BLOG - get a single blog
router.get("/:title", function(req, res, next) {
  Blog.findOne({ title: req.params.title }, function(err, currentlyBlog){
    if (err) return next(err);
    console.log(currentlyBlog);
    
    Blog.findOne(
        { postedTime: { $gt: currentlyBlog.postedTime } },
        {title: 1, image: 1},
        { sort: { postedTime: 1 }, limit: 1 },
        function(err, nextBlog) {
            if(err) return next(err);
            // console.log("Next blog: " + nextBlog);
            if (!nextBlog) {
                nextBlog = currentlyBlog;
            }
            
            Blog.findOne(
                { postedTime: { $lt: currentlyBlog.postedTime } },
                {title: 1, image: 1},
                { sort: { postedTime: -1 }, limit: 1 },
                function(err, prevBlog) {
                    if(err) return next(err);
                    // console.log("Previous blog: " + prevBlog);
                    if (!prevBlog) {
                        prevBlog = currentlyBlog;
                    }
                    
                    Blog.find(
                        { postedTime: { $lt: Date.now() } },
                        {title: 1, image: 1, postedTime: 1},
                        { sort: { postedTime: -1 }, limit: 4 },
                        function(err, recentBlogs) {
                            if(err) return next(err);
                            // console.log("Recent Post: " + recentBlogs);
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
                            // console.log(blogDetail);
                            res.json(blogDetail);
                        }
                    );
                    
                }
            );
        }
    );
    
  });
 
});

// //CREATE - add a new idol to db
// router.post("/", preAuthenticate, middleware.isLoggedIn, function(req, res, next) {
//   Idol.create(req.body.idol, function (err, newlyIdol) {
//     if (err) return next(err);
//     newlyIdol.author.id = req.user._id;
//     newlyIdol.author.username = req.user.username;
//     newlyIdol.save();
//     console.log(newlyIdol);
//     res.json(newlyIdol);
//   });
// });

// //UPDATE - edit a idol in db
// router.put("/:id", middleware.checkUserIdol, function(req, res, next) {
//   Idol.findByIdAndUpdate(req.params.id, req.body.idol, function (err, idol) {
//     if (err) return next(err);
//     console.log(idol);
//   });
// });

// //DESTROY - delete a idol from db
// router.delete("/:id", middleware.checkUserIdol, function(req, res, next) {
//   Idol.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return next(err);
//   });
// });

module.exports = router;