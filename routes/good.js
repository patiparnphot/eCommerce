var express   = require("express"),
    router    = express.Router(),
    moment    = require("moment-timezone"),
    fs        = require("fs"),
    Good      = require("../models/good"),
    goodState = require("../initial_state/good");
    // middleware = require("../middleware");

// var preAuthenticate = function (req,res,next){
//     console.log(JSON.stringify(req.body));
//     return next();
// };


//GOODS - get a list of goods
router.get("/", function(req, res, next){
    Good.find(
        { postedTime: { $lt: Date.now() } },
        {},
        { sort: { postedTime: -1 }, limit: 20 }, function(err, listOfGoods){
            if(err) return next(err);
            res.json(listOfGoods);
        }
    );
});

//INITIALSTATE - update JSON file of initialState good
router.get("/updateJsonFile", async function(req, res, next) {
try {
    Good.find({}, {title: 1, _id: 0}, {}, async function(err, listOfGoods){
        if (err) return next(err);
        let goodStateArr = [];
        if (Array.isArray(listOfGoods) && (listOfGoods.length > 0)) {
            for (let i = 0; i < listOfGoods.length; i++) {
                let goodTitle = listOfGoods[i].title;
                goodStateArr.push(goodState(goodTitle));
            };
        };
        let finalGoodStateArr = await Promise.all(goodStateArr);
        let goodStateJS = `module.exports = function(goodTitle) { `;
        for (let j = 0; j < finalGoodStateArr.length; j++) {
            if (j == 0) {
                goodStateJS += `if ( goodTitle == `;
            } else {
                goodStateJS += `else if ( goodTitle == `;
            }
            goodStateJS += JSON.stringify(finalGoodStateArr[j].title);
            goodStateJS += ` ) { return `;
            goodStateJS += JSON.stringify(finalGoodStateArr[j].state);
            goodStateJS += `; } `;
        };
        goodStateJS += `else { return undefined; } }`;
        if (fs.existsSync("./initial_state/initialGoodState.js")) {
            fs.unlink("./initial_state/initialGoodState.js", function(err) {
                if (err) return next(err);
                console.log("The Javascript file which contains initial good state is deleted !!!");
            });
        };
        fs.writeFile("./initial_state/initialGoodState.js", goodStateJS, function(err) {
            if (err) return next(err);
            console.log("The Javascript file which contains initial good state is written !!!");
        });
        res.send("The Javascript file which contains initial good state is updated !!!");
    });
} catch (err) {
    res.send(err);
}
})

//GOOD - get a single good
router.get("/:title", function(req, res, next) {
  Good.findOne({ title: req.params.title }, function(err, currentlyGood){
    if (err) return next(err);
    console.log(currentlyGood);
    
    Good.find(
        { category: currentlyGood.category },
        { title: 1, image: 1, rating: 1, cost: 1 },
        { sort: { postedTime: -1 }, limit: 10 },
        function(err, sameCategoryGoods) {
            if(err) return next(err);
            // console.log("Same category good: " + sameCategoryGoods);
            let similarGoods = [];
            if (sameCategoryGoods && sameCategoryGoods.length > 0) {
                for (let i = 0; i < sameCategoryGoods.length; i++) {
                    if (sameCategoryGoods[i].title != currentlyGood.title) {
                        similarGoods.push(sameCategoryGood[i]);
                    }
                }
            } else { similarGoods.push(currentlyGood); }
            
            Good.find(
                {},
                { title: 1, image: 1, rating: 1, cost: 1 },
                { sort: { rating: -1 }, limit: 10 },
                function(err, popularGoods) {
                    if(err) return next(err);
                    // console.log("Popular good: " + popularGoods);
                    if (!popularGoods || popularGoods.length < 1) {
                        popularGoods = [];
                        popularGoods.push(currentlyGood);
                    }
                    
                    Good.find(
                        { postedTime: { $lt: Date.now() } },
                        { title: 1, image: 1, rating: 1, cost: 1 },
                        { sort: { postedTime: -1 }, limit: 10 },
                        function(err, recentGoods) {
                            if(err) return next(err);
                            // console.log("Recent Good: " + recentGoods);
                            
                            let goodDetail = {};
                            goodDetail = {
                                '_id': currentlyGood._id,
                                'descriptionHtml': currentlyGood.descriptionHtml,
                                'titleHtml': currentlyGood.titleHtml,
                                'image': currentlyGood.image,
                                'slug': currentlyGood.slug,
                                'title': currentlyGood.title,
                                'description': currentlyGood.description,
                                'category': currentlyGood.category,
                                'rating': currentlyGood.rating,
                                'ratingAmount': currentlyGood.ratingAmount,
                                'raterAmount': currentlyGood.raterAmount,
                                'postedTime': currentlyGood.postedTime,
                                'similarGoods': similarGoods,
                                'popularGoods': popularGoods,
                                'recentGoods': recentGoods
                            };
                            // console.log(goodDetail);
                            res.json(goodDetail);
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