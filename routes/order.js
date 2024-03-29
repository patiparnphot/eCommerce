var express    = require("express"),
    router     = express.Router(),
    passport   = require("passport"),
    nodeMailer = require("nodemailer"),
    config     = require("../config.json"),
    moment     = require("moment-timezone"),
    fs         = require("fs"),
    Order      = require("../models/order"),
    Good       = require("../models/good");
    // middleware = require("../middleware");

var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

var smtpTransport = nodeMailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secureConnection: true,
    auth: {
        user: config.userEmail,
        pass: config.passEmail
    }
 });

function checkGoodDetail (good, subTotal) {
    return new Promise((resolve, reject) => {
        Good.findOne({ title: good.title }, function (err, currentlyGood) {
            if (err) reject(err);
            // console.log(currentlyGood);
            if (!currentlyGood) {
                reject("Title is Invalid!!!");
            } else {
                let currentlyGoodOption = currentlyGood.options.filter(
                    goodOption => (
                        goodOption.key == good.key
                    )
                );
                if (currentlyGoodOption.length < 1) {
                    reject("Option is Invalid!!!");
                } else {
                    if (currentlyGoodOption[0].cost != good.costPerUnit) {
                        reject("CostPerUnit is Invalid!!!");
                    } else {
                        if ((good.costPerUnit*good.amount) != good.cost) {
                            reject("Cost is Invalid!!!");
                        } else {
                            resolve(subTotal + good.cost);
                        }
                    }
                }
            }
        });
    })
}


//ORDERAMOUNT - get order amount
router.get("/amount", function(req, res, next){
    Order.count(
        { createdAt: { $lt: Date.now() } },
        function(err, orderAmount){
            if(err) return next(err);
            res.json(orderAmount);
        }
    );
});

//ORDERS - get a paginate list of orders
router.get("/:start/:end", function(req, res, next){
    Order.find(
        { createdAt: { $lt: Date.now() } },
        {},
        { 
            sort: { createdAt: -1 }, 
            skip: Number(req.params.start) - 1, 
            limit: (Number(req.params.end) - Number(req.params.start)) + 1
        }, 
        function(err, listOfOrders){
            if(err) return next(err);
            res.json(listOfOrders);
        }
    );
});

//ORDER - get a single order
router.get("/:invoiceId", function(req, res, next) {
  Order.findOne({ invoiceId: req.params.invoiceId }, function(err, currentlyOrder){
    if (err) return next(err);
    console.log(currentlyOrder);
    
    res.json(currentlyOrder);
    
  });
 
});

//CREATE - add a new order to db
router.post(
    "/", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}), 
    async function(req, res, next) {
        try {
            let order = req.body.order;
            let allGoods = order.goods;
            let subTotal = 0;
            for(const good of allGoods) {
                subTotal = await checkGoodDetail(good, subTotal);
            }
            if (subTotal != order.subTotal) {
                return next("Subtotal is Invalid!!!");
            }
            if (order.total != order.subTotal + order.delivereeFee) {
                return next("Total is Invalid!!!");
            }
            order.invoiceId = "EC" + Date.now();
            Order.create(order, function (err, newlyOrder) {
                if (err) return next(err);
                newlyOrder.customer.id = req.user._id;
                newlyOrder.customer.username = req.user.username;
                newlyOrder.save();
                var mailOptions = {
                    from: `${config.userEmail}@gmail.com`,
                    to: newlyOrder.customer.email,
                    subject: "you ordered a product",
                    html: `<a href="${config.domainname}/invoice/${newlyOrder.invoiceId}">InvoiceId is ${newlyOrder.invoiceId}</a>`
                };
                smtpTransport.sendMail(mailOptions, function(err){
                    if(err) return next(err);
                    console.log("mail sent");
                });
                console.log(newlyOrder);
                res.json(newlyOrder);
            });
        } catch (err) {
            next(err);
        }
    }
);

//APPROVE - approve a order in db
router.put(
    "/:invoiceId", 
    preAuthenticate, 
    passport.authenticate('jwt', {session: false}),
    //middleware.checkUserIdol, 
    function(req, res, next) {
        Order.findOneAndUpdate(
            { invoiceId: req.params.invoiceId }, 
            req.body.approvedOrder, 
            { new: true }, 
            function (err, approvedOrder) {
                if (err) return next(err);
                console.log(approvedOrder);
                res.json(approvedOrder);
            }
        );
    }
);

module.exports = router;
