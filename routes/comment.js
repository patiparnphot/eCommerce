var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Good = require("../models/good"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


//CREATE - add a new comment to db
router.post("/", middleware.isLoggedIn, function(req, res){
   Good.findById(req.params.id, function(err, good){
       if(err){
            req.flash("error", "DONT MESS WITH MY SITE");
            res.redirect("back");
        }
      Comment.create(req.body.comment, function(err, comment){
          if(err){
            req.flash("error", "CANNOT ADD NEW COMMENT");
            res.redirect("back");
          }
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         comment.save();
         good.comments.push(comment);
         good.save();
         req.flash("success", "Successfully add your comment");
         res.json(comment);
      });
   });
});

//UPDATE - edit a comment in db
router.put("/:commentId", middleware.checkUserComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
        if(err){
            req.flash("error", "DONT MESS WITH MY SITE");
            res.redirect("back");
        }
        req.flash("success", "Successfully edit your comment")
        res.json(comment);
    });
});

//DESTROY - delete a campground from db
router.delete("/:commentId", middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            req.flash("error", "DONT MESS WITH MY SITE");
            res.redirect("back");
        }
        req.flash("success", "Successfully remove your comment");
        res.json({ success: true });
    });
});

module.exports = router;