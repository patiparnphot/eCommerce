var express = require("express"),
    router  = express.Router({mergeParams: true}),
    passport = require("passport"),
    Good = require("../models/good"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

//CREATE - add a new comment to db
router.post(
    "/",
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    //middleware.isLoggedIn, 
    function(req, res, next){
        Good.findOne({ slug: req.body.slug }, function(err, good){
            if (err) return next(err);
            Comment.create(req.body.comment, function(err, comment){
                if (err) return next(err);
                comment.rater.id = req.user._id;
                comment.rater.username = req.user.username;
                comment.save();
                let newRatingAmount = Number(good.ratingAmount) + Number(comment.rating);
                let newRaterAmount = Number(good.raterAmount) + 1;
                good.ratingAmount = Number(newRatingAmount);
                good.raterAmount = Number(newRaterAmount);
                good.rating = Math.round((newRatingAmount/newRaterAmount)*10)/10;
                good.comments.push(comment);
                good.save();
                res.json(comment);
            });
        });
    }
);

//UPDATE - edit a comment in db
router.put(
    "/:commentId",
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserComment, 
    function(req, res, next){
        Good.findOne({ slug: req.body.slug }).populate("comments").exec(function(err, good){
            if (err) return next(err);
            let oldGoodCommentArray = good.comments;
            let beforeEditComment = oldGoodCommentArray.filter(
                oldComment => (
                    oldComment._id == req.params.commentId
                )
            );
            if (beforeEditComment.length < 1) return next("this comment is not for this good!!!");
            Comment.findByIdAndUpdate(
                req.params.commentId, 
                req.body.comment, 
                { new: true }, 
                function(err, comment){
                    if (err) return next(err);
                    let editedRatingAmount = Number(good.ratingAmount) - Number(beforeEditComment[0].rating) + Number(comment.rating);
                    let editedRaterAmount = Number(good.raterAmount);
                    good.ratingAmount = Number(editedRatingAmount);
                    good.rating = Math.round((editedRatingAmount/editedRaterAmount)*10)/10;
                    good.save();
                    res.json(comment);
                }
            );
        });
    }
);

//DESTROY - delete a comment from db
router.delete(
    "/:commentId", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserComment, 
    function(req, res, next){
        Good.findOne({ slug: req.body.slug }, function(err, good){
            if (err) return next(err);
            let goodCommentArray = good.comments;
            let index = goodCommentArray.indexOf(req.params.commentId);
            if (index == -1) return next("this comment is not for this good!!!");
            Comment.findByIdAndRemove(req.params.commentId, function(err, comment){
                if (err) return next(err);
                if (!comment) return next("this comment id does not exist!!!");
                goodCommentArray.splice(index, 1);
                let newRatingAmount = Number(good.ratingAmount) - Number(comment.rating);
                let newRaterAmount = Number(good.raterAmount) - 1;
                good.ratingAmount = Number(newRatingAmount);
                good.raterAmount = Number(newRaterAmount);
                good.rating = Math.round((newRatingAmount/newRaterAmount)*10)/10;
                good.comments = goodCommentArray;
                good.save();
                res.json(comment);
            });
        });
    }
);

module.exports = router;