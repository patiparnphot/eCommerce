// Setup NPM
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    fs		        = require("fs"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    JWTStrategy     = require("passport-jwt").Strategy,
    ExtractJWT      = require("passport-jwt").ExtractJwt,
    multer          = require("multer"),
    // FacebookStrategy= require("passport-facebook").Strategy,
    // flash           = require("connect-flash"),
    //session         = require("express-session"),
    methodOverride  = require("method-override"),
    http            = require("http"),
    https           = require("https"),
    User            = require("./models/user"),
    path            = require("path");

//import { Helmet } from "react-helmet";

var serverSideRender    = require("./src/serverSideRender"),
    template            = require("./static/template"),
    initialContentState = require("./initial_state/initialContentState.json"),
    initialBlogState    = require("./initial_state/initialBlogState"),
    initialGoodState    = require("./initial_state/initialGoodState"),
    initialGoodCatState = require("./initial_state/initialGoodCatState");

// Set Auto Reload due to file change
fs.watchFile(require.resolve('./initial_state/initialContentState.json'), function () {
   console.log("InitialContentState changed, reloading...");
   delete require.cache[require.resolve('./initial_state/initialContentState.json')]
   initialContentState = require('./initial_state/initialContentState.json');
   console.log("InitialContentState has changed and Server has reloaded!!!");
});
fs.watchFile(require.resolve('./initial_state/initialBlogState'), function () {
   console.log("InitialBlogState changed, reloading...");
   delete require.cache[require.resolve('./initial_state/initialBlogState')]
   initialBlogState = require('./initial_state/initialBlogState');
   console.log("InitialBlogState has changed and Server has reloaded!!!");
});
fs.watchFile(require.resolve('./initial_state/initialGoodState'), function () {
   console.log("InitialGoodState changed, reloading...");
   delete require.cache[require.resolve('./initial_state/initialGoodState')]
   initialGoodState = require('./initial_state/initialGoodState');
   console.log("InitialGoodState has changed and Server has reloaded!!!");
});
fs.watchFile(require.resolve('./initial_state/initialGoodCatState'), function () {
   console.log("InitialGoodCatState changed, reloading...");
   delete require.cache[require.resolve('./initial_state/initialGoodCatState')]
   initialGoodState = require('./initial_state/initialGoodCatState');
   console.log("InitialGoodCatState has changed and Server has reloaded!!!");
});

// Point static path
app.use('/admin', express.static('./admin/static'));
app.use(express.static('./static'));

// Requiring API routes
var blogRoutes    = require("./routes/blog"),
    contentRoutes = require("./routes/content"),
    goodRoutes    = require("./routes/good"),
    userRoutes    = require("./routes/user"),
    commentRoutes = require("./routes/comment"),
    orderRoutes   = require("./routes/order");
    
// Database setup
mongoose.connect("mongodb+srv://bomgeo57:bomgeo57@cluster0.w7pxj.mongodb.net/e-commerce?retryWrites=true&w=majority" || "mongodb://localhost/bnk48");

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// Setup https method
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
// app.use(session({
//     secret: "It is me",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new JWTStrategy(
   {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'bukunjom'
   },
   (jwtPayload, cb) => {
      // console.log("jwtPayload: ", jwtPayload);
      return User.findOne({ username: jwtPayload.username })
         .then(user => {
            return cb(null, user);
         })
         .catch(err => {
            return cb(err);
         });
   }
));
// passport.serializeUser(function(user, done){ done(null, user) });
// passport.deserializeUser(function(user, done){ done(null, user) });

// Upload file configuration
var storage = multer.diskStorage({
   filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   },
   destination: function (req, file, cb) {
      cb(null, './static/upload');
   },
});
var imageFilter = function (req, file, cb) {
   // accept image files only
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
   } else {
      return cb(null, true);
   }
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

// Set upload API
app.post(
   '/upload',
   passport.authenticate('jwt', {session: false}),
   upload.single('image'),
   function(req, res, next){
      if(req.user.isAdmin) {
         return res.json(req.file);
      } else {
         return res.status(422).send("this user isn't admin");
      }
   }
);

// Set our API routes
app.use("/api/contents", contentRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/goods", goodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);

// Catch all admin sub-routes and return the index file of admin folder
app.get('/admin/*', async (req, res, next) => {
   try {
      //res.sendFile(path.join(__dirname, 'static/example.html'));
      var adminServerSideRender    = require("./admin/src/serverSideRender"),
          adminTemplate            = require("./admin/static/template");
      const { preloadedState, content } = adminServerSideRender({}, req.url);
      const response = adminTemplate("ADMINISTRATOR", preloadedState, content);
      res.send(response);
   } catch (e) {
      next(e);
   }
});

// Catch all other routes and return the index file
app.get('*', async (req, res, next) => {
   try {
      //res.sendFile(path.join(__dirname, 'static/example.html'));
      let initialStateJson = initialContentState;
      let titleHtml = initialStateJson.contents.index.content.titleHtml;
      let descriptionHtml = initialStateJson.contents.index.content.descriptionHtml;
      let urlArr = (req.url).split("/");
      if (urlArr.length == 3 && (urlArr[2] != '') && urlArr[1] == 'blogs') {
         let activeBlog = await initialBlogState(urlArr[2]);
         // console.log('blogState', activeBlog);
         initialStateJson.blogs.activeBlog = {
            "blog": activeBlog,
            "error": null,
            "loading": false
         };
         if(activeBlog && activeBlog.title != "noSlug") {
            titleHtml = activeBlog.titleHtml;
            descriptionHtml = activeBlog.descriptionHtml;
         }
      } else if (urlArr.length == 3 && (urlArr[2] != '') && (urlArr[1] == 'goods')) {
         let goodCategory = await initialGoodCatState(urlArr[2]);
         // console.log('goodCategoryState', goodCategory);
         initialStateJson.contents.goodCategory = {
            "content": goodCategory,
            "error": null,
            "loading": false
         };
         if(goodCategory && goodCategory.title != "noTitle") {
            titleHtml = goodCategory.titleHtml;
            descriptionHtml = goodCategory.descriptionHtml;
         }
      } else if (urlArr.length == 4 && (urlArr[3] != '') && urlArr[1] == 'goods') {
         let activeGood = await initialGoodState(urlArr[3]);
         // console.log('goodState', activeGood);
         initialStateJson.goods.activeGood = {
            "good": activeGood,
            "error": null,
            "loading": false
         };
         if(activeGood && activeGood.title != "noSlug") {
            titleHtml = activeGood.titleHtml;
            descriptionHtml = activeGood.descriptionHtml;
         }
      }
      //const helmet = Helmet.renderStatic();
      const { preloadedState, content } = serverSideRender(initialStateJson, req.url);
      const response = template(titleHtml, preloadedState, content, descriptionHtml);
      res.send(response);
   } catch (e) {
      next(e);
   }
});

app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

/**
 * Get port from environment and store in Express.
 */
const port = '1210';
const sslPort = '443';
app.set('port', port);
app.set('sslPort', sslPort);

/**
 * Create HTTP server.
 */
//const options = {
//   key:  fs.readFileSync('../cert/privkey.pem'),
//   cert: fs.readFileSync('../cert/cert.pem')
//};
const server = http.createServer(app);
//const secureSocketsLayer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`The MEATSEO Server Has Started!`));
//secureSocketsLayer.listen(sslPort, () => console.log(`The Secure Sockets Layer Is Connected!`));

