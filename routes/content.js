var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    nodeMailer  = require("nodemailer"),
    fs      = require("fs"),
    Content = require("../models/content"),
    Author  = require("../models/author"),
    contentState = require("../initial_state/content");
    
var handler = require('../data_handler');

var smtpTransport = nodeMailer.createTransport({
   service: "Gmail",
   host: "smtpdm.aliyun.com",
   port: 465,
   secureConnection: true,
   auth: {
           user: "meatseo",
           pass: "ktymosmhlcmlljpu"
   }
});

//Tee023936760

var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

//INDEXCONTENT - get content of index page
router.get("/index", function(req, res, next){
    // res.json(handler.indexContents());

    Content.findOne(
        { contentType: "index" },
        {},
        { sort: { postedTime: -1 }, limit: 1 },
        function(err, indexContent){
            if(err) return next(err);
            res.json(indexContent.content);
        }
    );
});

//TEMPLATECONTENT - get content of template
router.get("/template", function(req, res, next){
    // res.json(handler.templateContents());
    
    Content.findOne(
        { contentType: "template" },
        {},
        { sort: { postedTime: -1 }, limit: 1 },
        function(err, templateContent){
            if(err) return next(err);
            res.json(templateContent.content);
        }
    );
});

//BLOGDETAILCONTENT - get content of blog
router.get("/blogdetail", function(req, res, next){
    // res.json(handler.blogDetailContents());

    Content.findOne(
        { contentType: "blogdetail" },
        {},
        { sort: { postedTime: -1 }, limit: 1 },
        function(err, blogdetailContent){
            if(err) return next(err);
            res.json(blogdetailContent.content);
        }
    );
});

//CONTACTUSCONTENT - get content of contact us
router.get("/contactus", function(req, res, next){
    // res.json(handler.blogDetailContents());

    Content.findOne(
        { contentType: "contactus" },
        {},
        { sort: { postedTime: -1 }, limit: 1 },
        function(err, contactusContent){
            if(err) return next(err);
            res.json(contactusContent.content);
        }
    );
});

//BLOGAUTHOR - get author data of blogs
router.get("/authorblog", function(req, res, next){
    // res.json(handler.blogDetailContents());

    Author.findOne(
        {},
        {},
        { sort: { postedTime: -1 }, limit: 1 },
        function(err, authorBlog){
            if(err) return next(err);
            res.json(authorBlog);
        }
    );
});

//INITIALSTATE - update JSON file of initialState content
router.get("/updateJsonFile", async function(req, res, next) {
    try {
        let contentStateJson = await contentState();
        if (fs.existsSync("./initial_state/initialContentState.json")) {
            fs.unlink("./initial_state/initialContentState.json", function(err) {
               if (err) return next(err);
               console.log("The Javascript file which contains initial content state is deleted !!!");
            });
        };
        fs.writeFile("./initial_state/initialContentState.json", JSON.stringify(contentStateJson), function(err) {
            if (err) return next(err);
            console.log("The Javascript file which contains initial content state is written !!!");
        });
        res.send("The Javascript file which contains initial content state is updated !!!");
    } catch (err) {
        res.send(err);
    }
})

//CREATE - add new content to db
router.post(
    "/", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    function(req, res, next) {
        Content.create(req.body.content, function (err, newContent) {
            if (err) return next(err);
            newContent.save();
            console.log(newContent);
            res.json(newContent);
        });
    }
);

//CREATE AUTHOR - add new author data of blogs
router.post(
    "/authorblog", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    function(req, res, next) {
        Author.create(req.body.data, function (err, newAuthor) {
            if (err) return next(err);
            newAuthor.save();
            console.log(newAuthor);
            res.json(newAuthor);
        });
    }
);

//SEND MESSAGE - send message via email
router.post("/message", function(req, res, next){
    console.log("enter");  
    var mailOptions = {
        from: "meatseo@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        text: "from " + req.body.name + "\n\n" + req.body.message
    };
    smtpTransport.sendMail(mailOptions, function(err){
        if(err) return next(err);
        console.log("mail sent");
        res.send("A message of " + req.body.name + " have been sent to meatseo email already.");
    });
});


module.exports = router;
