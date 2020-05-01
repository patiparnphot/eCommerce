var express = require("express"),
    router  = express.Router(),
    nodeMailer  = require("nodemailer"),
    fs      = require("fs"),
    IndexContent = require("../models/indexContent"),
    BlogDetailContent = require("../models/blogDetailContent"),
    TemplateContent = require("../models/templateContent"),
    contentState = require("../initial_state/content");
    
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

//INDEXCONTENT - get content of index page
router.get("/index", function(req, res, next){
    IndexContent.findOne({}, function(err, indexContent){
        if(err) return next(err);
        res.json(indexContent);
    });
});

//TEMPLATECONTENT - get content of template
router.get("/template", function(req, res, next){
    TemplateContent.findOne({}, function(err, templateContent){
        if(err) return next(err);
        res.json(templateContent);
    });
});

//BLOGDETAILCONTENT - get content of blog
router.get("/blogdetail", function(req, res, next){
    BlogDetailContent.findOne({}, function(err, blogDetailContent){
        if(err) return next(err);
        res.json(blogDetailContent);
    });
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
