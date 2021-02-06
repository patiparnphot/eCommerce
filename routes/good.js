var express      = require("express"),
    router       = express.Router(),
    passport     = require("passport"),
    moment       = require("moment-timezone"),
    fs           = require("fs"),
    Good         = require("../models/good"),
    Comment      = require("../models/comment"),
    Category     = require("../models/category"),
    goodState    = require("../initial_state/good"),
    goodCatState = require("../initial_state/goodCategory");
    // middleware = require("../middleware");

var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

function getAndDeleteGood(category, callback) {
    Good.find({category: category}).populate("comments").exec( function (err, data) {
        if (err) {
            callback(err);
        } else {
            Good.deleteMany({category: category}, function (err, r) {
                if (err) {
                    callback(err);
                } else if(r.n == 0) {
                    console.log(`no delete good of delete ${category} category`);
                    callback("no deleted good");
                } else if(r.n != r.deletedCount) {
                    console.log(`success on delete ${r.deletedCount} of ${r.n} good of delete ${category} category`);
                    callback("deleted some good");
                } else if(r.n == r.deletedCount) {
                    console.log(`success on delete ${r.deletedCount} good of delete ${category} category`);
                    callback(null, data);
                }
            });
        }
    });
}


//GOOD AMOUNT - get good amount
router.get("/amount", function(req, res, next){
    Good.count(
        { postedTime: { $lt: Date.now() } },
        function(err, goodAmount){
            if(err) return next(err);
            res.json(goodAmount);
        }
    );
});

//GOOD CATEGORY AMOUNT - get good category amount
router.get("/categories/amount", function(req, res, next){
    Category.count(
        {
            categoryType: "good", 
            postedTime: { $lt: Date.now() }
        },
        function(err, goodCategoryAmount){
            if(err) return next(err);
            res.json(goodCategoryAmount);
        }
    );
});

//GOOD CATEGORY PROPS - get good category properties
router.get("/categories/allProps", async function(req, res, next){
    Category.find(
        {
            categoryType: "good", 
            postedTime: { $lt: Date.now() }
        },
        {
            title: 1,
            options: 1,
            features: 1,
            _id: 0
        },
        async function(err, goodCategoryProps){
            if(err) return next(err);
            res.json(goodCategoryProps);
        }
    );
});

//RECENT GOODS - get a recent list of goods
router.get("/recent", function(req, res, next){
    Good.find(
        { postedTime: { $lt: Date.now() } },
        {},
        { sort: { postedTime: -1 }, limit: 20 },
        function(err, listOfGoods){
            if(err) return next(err);
            res.json(listOfGoods);
        }
    );
});

//POPULAR GOODS - get a popular list of goods
router.get("/popular", function(req, res, next){
    Good.find(
        {},
        {},
        { sort: { rating: -1 }, limit: 20 },
        function(err, listOfGoods){
            if(err) return next(err);
            res.json(listOfGoods);
        }
    );
});

//FILTER GOODS - get a filtered list of goods
router.post("/filter", function(req, res, next){
    Good.find(
        req.body.filter,
        {},
        { sort: { postedTime: -1 } },
        function(err, listOfGoods){
            if(err) return next(err);
            res.json(listOfGoods);
        }
    );
});

//INITIALSTATE - update JSON file of initialState good
router.get("/updateJsonFile", async function(req, res, next) {
    try {
        Good.find({}, {slug: 1, _id: 0}, {}, async function(err, listOfGoods){
            if (err) return next(err);
            let goodStateArr = [];
            if (Array.isArray(listOfGoods) && (listOfGoods.length > 0)) {
                for (let i = 0; i < listOfGoods.length; i++) {
                    let goodSlug = listOfGoods[i].slug;
                    goodStateArr.push(goodState(goodSlug));
                };
            };
            let finalGoodStateArr = await Promise.all(goodStateArr);
            let goodStateJS = `module.exports = function(goodSlug) { `;
            for (let j = 0; j < finalGoodStateArr.length; j++) {
                if (j == 0) {
                    goodStateJS += `if ( goodSlug == `;
                } else {
                    goodStateJS += `else if ( goodSlug == `;
                }
                goodStateJS += JSON.stringify(finalGoodStateArr[j].slug);
                goodStateJS += ` ) { return `;
                goodStateJS += JSON.stringify(finalGoodStateArr[j].state);
                goodStateJS += `; } `;
            };
            goodStateJS += `else { return {"title": "noSlug"}; } }`;
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

//INITIALCATEGORYSTATE - update JSON file of initialState good category
router.get("/categories/updateJsonFile", async function(req, res, next) {
    try {
        Category.find({}, {title: 1, _id: 0}, {}, async function(err, listOfGoodCats){
            if (err) return next(err);
            let goodCatStateArr = [];
            if (Array.isArray(listOfGoodCats) && (listOfGoodCats.length > 0)) {
                for (let i = 0; i < listOfGoodCats.length; i++) {
                    let goodCatTitle = listOfGoodCats[i].title;
                    goodCatStateArr.push(goodCatState(goodCatTitle));
                };
            };
            let finalGoodCatStateArr = await Promise.all(goodCatStateArr);
            let goodCatStateJS = `module.exports = function(goodCatTitle) { `;
            for (let j = 0; j < finalGoodCatStateArr.length; j++) {
                if (j == 0) {
                    goodCatStateJS += `if ( goodCatTitle == `;
                } else {
                    goodCatStateJS += `else if ( goodCatTitle == `;
                }
                goodCatStateJS += JSON.stringify(finalGoodCatStateArr[j].title);
                goodCatStateJS += ` ) { return `;
                goodCatStateJS += JSON.stringify(finalGoodCatStateArr[j].state);
                goodCatStateJS += `; } `;
            };
            goodCatStateJS += `else { return {"title": "noTitle"}; } }`;
            if (fs.existsSync("./initial_state/initialGoodCatState.js")) {
                fs.unlink("./initial_state/initialGoodCatState.js", function(err) {
                    if (err) return next(err);
                    console.log("The Javascript file which contains initial good category state is deleted !!!");
                });
            };
            fs.writeFile("./initial_state/initialGoodCatState.js", goodCatStateJS, function(err) {
                if (err) return next(err);
                console.log("The Javascript file which contains initial good category state is written !!!");
            });
            res.send("The Javascript file which contains initial good catefory state is updated !!!");
        });
    } catch (err) {
        res.send(err);
    }
})

//GOOD - get a single good
router.get("/:slug", function(req, res, next) {
  Good.findOne({ slug: req.params.slug }).populate("comments").exec(function(err, currentlyGood){
    if (err || !currentlyGood) return res.json({'title': 'noSlug', 'err': err});
    console.log("currently good: ", currentlyGood);
    
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
                        similarGoods.push(sameCategoryGoods[i]);
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
                                'options': currentlyGood.options,
                                'specificOptions': currentlyGood.specificOptions,
                                'isAvailable': currentlyGood.isAvailable,
                                'comments': currentlyGood.comments,
                                'similarGoods': similarGoods,
                                'popularGoods': popularGoods,
                                'recentGoods': recentGoods,
                                'comments': currentlyGood.comments
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

//ACTIVE GOOD CATEGORY - get a single good category
router.get("/categories/:title", async function(req, res, next) {
    if(!req.params.title || typeof(req.params.title) != "string") next("title is invalid");
    let title = req.params.title;
    console.log("title: ", title);
    Category.findOne(
        {
            categoryType: "good",
            title: title
        },
        function(err, category){
            if(err) return next(err);
            res.json(category);
        }
    );
})

//GOOD PAGINATION - get a paginate list of goods
router.get("/:start/:end", function(req, res, next){
    Good.find(
        { postedTime: { $lt: Date.now() } },
        {},
        { 
            sort: { postedTime: -1 }, 
            skip: Number(req.params.start) - 1, 
            limit: (Number(req.params.end) - Number(req.params.start)) + 1 
        }, 
        function(err, listOfGoods){
            if(err) return next(err);
            res.json(listOfGoods);
        }
    );
});

//GOOD CATEGORY PAGINATION - get a paginate list of good categories
router.get("/categories/:start/:end", function(req, res, next){
    Category.find(
        { categoryType: "good" },
        {},
        { 
            sort: { postedTime: -1 }, 
            skip: Number(req.params.start) - 1, 
            limit: (Number(req.params.end) - Number(req.params.start)) + 1 
        }, 
        function(err, listOfCategories){
            if(err) return next(err);
            res.json(listOfCategories);
        }
    );
});

//CREATE GOOD - add a new good to db
router.post(
    "/", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    function(req, res, next) {
        Good.create(req.body.good, function (err, newGood) {
            if (err) return next(err);
            newGood.save();
            console.log(newGood);
            res.json(newGood);
        });
    }
);

//CREATE GOOD CATEGORY - add a new good category to db
router.post(
    "/categories/", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    function(req, res, next) {
        Category.create(req.body.category, function (err, newCategory) {
            if (err) return next(err);
            newCategory.save();
            console.log(newCategory);
            res.json(newCategory);
        });
    }
);

//UPDATE GOOD - edit a good in db
router.put(
    "/:id", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserIdol, 
    function(req, res, next) {
        Good.findByIdAndUpdate(
            req.params.id, 
            req.body.editGood, 
            { new: true }, 
            function (err, editedGood) {
                if (err) return next(err);
                console.log(editedGood);
                res.json(editedGood);
            }
        );
    }
);

//UPDATE GOOD CATEGORY - edit a good category in db
router.put(
    "/categories/:id", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserIdol, 
    function(req, res, next) {
        Category.findByIdAndUpdate(
            req.params.id,
            req.body.editCategory,
            function (err, editedCategory) {
                if (err) return next(err);
                Good.updateMany(
                    { category: editedCategory._doc.title },
                    { category: req.body.editCategory.title },
                    function (err, editedGoods) {
                        if (err) {
                            console.log(`error on update good of update ${editedCategory._doc.title} category: `, err);
                        } else if (editedGoods) {
                            if(editedGoods.n == 0) {
                                console.log(`no update good of update ${editedCategory._doc.title} category`);
                            } else if(editedGoods.n != editedGoods.nModified) {
                                console.log(`success on update ${editedGoods.nModified} of ${editedGoods.n} good of update ${editedCategory._doc.title} category`);
                            } else if(editedGoods.n == editedGoods.nModified) {
                                console.log(`success on update good of update ${editedCategory._doc.title} category`);
                            }
                        }
                    }
                );
                let newCategory = { 
                    ...editedCategory._doc,
                    title: req.body.editCategory.title,
                    text: req.body.editCategory.text,
                    categoryType: req.body.editCategory.categoryType,
                    titleHtml: req.body.editCategory.titleHtml,
                    descriptionHtml: req.body.editCategory.descriptionHtml
                };
                res.json(newCategory);
            }
        );
    }
);

//DESTROY GOOD - delete a good from db
router.delete(
    "/:slug", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserIdol, 
    function(req, res, next) {
        Good.findOneAndRemove({ slug: req.params.slug }).populate("comments").exec(function(err, deletedGood) {
            if (err) return next(err);
            deletedGood.comments.forEach((comment) => {
                Comment.findByIdAndRemove(comment._id, function (err, removedComment) {
                    if(!err && removedComment) {
                        console.log("removed comment: ", removedComment._id);
                    } else {
                        console.log("cannot remove comment: ", comment._id);
                    }
                });
            });
            res.json(deletedGood);
        });
    }
);

//DESTROY GOOD CATEGORY - delete a good category from db
router.delete(
    "/categories/:title", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserIdol, 
    function(req, res, next) {
        Good.find(
            { category: req.params.title },
            function (err, goodCategory) {
                if (err) return next(err);
                let hasGoodMsg = {
                    message: "Delete all of goods in this category before delete this category",
                    name: "HasGoodError"
                };
                if (!goodCategory || (goodCategory.length > 0)) return res.status(422).json(hasGoodMsg);
                Category.findOneAndRemove(
                    {
                        title: req.params.title,
                        categoryType: "good"
                    },
                    function(err, deletedCategory) {
                        if (err) return next(err);
                        res.json(deletedCategory);
                    }
                );
            }
        );
    }
);

module.exports = router;
