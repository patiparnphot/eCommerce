var express   = require("express"),
    router    = express.Router(),
    passport     = require("passport"),
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


//BLOGAMOUNT - get blog amount
router.get("/amount", function(req, res, next){
    let blogAmount = handler.howManyBlogs();
    res.json(blogAmount);
    // Blog.count(
    //     { postedTime: { $lt: Date.now() } },
    //     function(err, blogAmount){
    //         if(err) return next(err);
    //         res.json(blogAmount);
    //     }
    // );
});

//PAGINATIONBLOG - get pagination blogs
router.get("/pagination/:start/:end", async function(req, res, next){
    let blogArray = await handler.findByPaginationBlogs(req.params.start, req.params.end);
    // let blogArray = await Blog.find(
    //     { postedTime: { $lt: Date.now() }},
    //     {},
    //     {
    //         sort: {postedTime: -1},
    //         skip: Number(req.params.start) - 1,
    //         limit: (Number(req.params.end) - Number(req.params.start)) + 1
    //     }
    // ).exec();
    res.json(blogArray);
});

//BLOGS - get all blogs
router.get("/", async function(req, res, next){
    let recentBlogs = await handler.findByRecentBlogs(20);
    res.json(recentBlogs);
    // Blog.find(
    //    { postedTime: { $lt: Date.now() } },
    //    {},
    //    { sort: { postedTime: -1 }, limit: 20 }, function(err, allBlogs){
    //        if(err) return next(err);
    //        res.json(allBlogs);
    //    }
    // );
});

//INITIALSTATE - update JSON file of initialState blog
router.get("/updateJsonFile", async function(req, res, next) {
    try {
        let allBlogs = await handler.listOfBlogName();
        // let allBlogs = await Blog.find({}, {slug: 1, _id: 0}, {}).exec();
        if (!allBlogs) return next("cannot get list of blog name");
        let blogStateArr = [];
        if (Array.isArray(allBlogs) && (allBlogs.length > 0)) {
            for (let i = 0; i < allBlogs.length; i++) {
                let blogTitle = allBlogs[i];
                blogStateArr.push(blogState(blogTitle));
            };
        };
        let finalBlogStateArr = await Promise.all(blogStateArr);
        let blogStateJS = `module.exports = function(blogSlug) { `;
        for (let j = 0; j < finalBlogStateArr.length; j++) {
            if (j == 0) {
                blogStateJS += `if ( blogSlug == `;
            } else {
                blogStateJS += `else if ( blogSlug == `;
            }
            blogStateJS += JSON.stringify(finalBlogStateArr[j].slug);
            blogStateJS += ` ) { return `;
            blogStateJS += JSON.stringify(finalBlogStateArr[j]);
            blogStateJS += `; } `;
        };
        blogStateJS += `else { return {"title": "noSlug"}; } }`;
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
router.get("/active/:slug", async function(req, res, next) {
    if(!req.params.slug || typeof(req.params.slug) != "string") next("slug is invalid");
    let slug = req.params.slug;
    console.log("slug: ", slug);
    let currentlyBlog = await handler.findByBlogName(slug);
    // let currentlyBlog = await Blog.findOne({ slug: slug }).exec();
    if(!currentlyBlog) {
        res.json({"title": "noSlug"});
    } else {
        res.json(currentlyBlog);
    }
})

//BLOG - get the data of blog page
router.get("/:slug", async function(req, res, next) {

    if(!req.params.slug || typeof(req.params.slug) != "string") next("slug is invalid");
    let slug = req.params.slug;
    // console.log("slug: ", slug);

    let currentlyBlog = await handler.findByBlogName(slug);
    // let currentlyBlog = await Blog.findOne({slug: slug}).exec();
    // console.log("Current blog: ", currentlyBlog);
    if(!currentlyBlog) {
        res.json({"title": "noSlug"});
    } else {
        let nextBlog = await handler.findByNextBlog(slug);
        // let nextBlog = await Blog.findOne(
        //     { postedTime: { $gt: currentlyBlog.postedTime } },
        //     { slug: 1, image: 1, title: 1 },
        //     { sort: { postedTime: 1 }, limit: 1 }
        // ).exec();
        // console.log("Next blog: ", nextBlog);
        if (!nextBlog) {nextBlog = currentlyBlog;}

        let prevBlog = await handler.findByPrevBlog(slug);
        // let prevBlog = await Blog.findOne(
        //     { postedTime: { $lt: currentlyBlog.postedTime } },
        //     { slug: 1, image: 1, title: 1 },
        //     { sort: { postedTime: -1 }, limit: 1 }
        // ).exec();
        // console.log("Previous blog: ", prevBlog);
        if (!prevBlog) {prevBlog = currentlyBlog;}

        let recentBlogs = await handler.findByRecentBlogs(4);
        // let recentBlogs = await Blog.find(
        //     { postedTime: { $lt: Date.now() } },
        //     { slug: 1, image: 1, title: 1, postedTime: 1 },
        //     { sort: { postedTime: -1 }, limit: 4 }
        // ).exec();
        // console.log("Recent Post: ", recentBlogs);

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
        // console.log("blogDetail: ", blogDetail);

        res.json(blogDetail);
    }
});

//CREATE - add a new idol to db
router.post("/create", async function(req, res, next) {
    const newBlog = await handler.createNewBlog(req.body.newBlog);
    if (!newBlog || newBlog == {}) return next("create fail");
    res.json(newBlog);
    // Blog.create(req.body.newBlog, function (err, newBlog) {
    //     if(err) {
    //         return next(err);
    //     } else if(!newBlog) {
    //         return next("something wrong");
    //     } else {
    //         newBlog.save();
    //         res.json(newBlog);
    //     }
    // });
});

//UPDATE - edit a blog
router.put("/edit/:id", async function(req, res, next) {
    const editedBlog = await handler.editBlog(req.params.id, req.body.editBlog);
    if (!editedBlog || editedBlog == {} || editedBlog.id != req.params.id) return next("edit fail");
    res.json(editedBlog);
    // Blog.findByIdAndUpdate(
    //     req.params.id, 
    //     req.body.editBlog, 
    //     { new: true }, 
    //     function (err, editedGood) {
    //         if (err) return next(err);
    //         console.log(editedGood);
    //         res.json(editedGood)
    //     }
    // );
});

//DESTROY - delete a blog from db
router.delete("/:id", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Blog.findByIdAndRemove(req.params.id, function (err, deletedBlog) {
        if (err) return next(err);
        res.json(deletedBlog);
    });
});

module.exports = router;