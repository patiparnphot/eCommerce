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
    initialGoodState    = require("./initial_state/initialGoodState");

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
      // console.log(jwtPayload);
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

// Set our api routes
app.use("/api/contents", contentRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/goods", goodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);

// Catch all other routes and return the index file
app.get('/admin/*', async (req, res, next) => {
   try {
      //res.sendFile(path.join(__dirname, 'static/example.html'));
      var adminServerSideRender    = require("./admin/src/serverSideRender"),
          adminTemplate            = require("./admin/static/template");
      //let initialStateJson = initialContentState;
      const { preloadedState, content } = adminServerSideRender({}, req.url);
      const response = adminTemplate("ADMINISTRATOR", preloadedState, content);
      res.send(response);
   } catch (e) {
      next(e);
   }
});

app.get('*', async (req, res, next) => {
   try {
      //res.sendFile(path.join(__dirname, 'static/example.html'));
      let initialStateJson = initialContentState;
      let titleHtml = initialStateJson.contents.index.content.titleHtml;
      let descriptionHtml = initialStateJson.contents.index.content.descriptionHtml;
      let urlArr = (req.url).split("/");
      if (urlArr.length >= 3 && urlArr[1] === 'blogs') {
         let activeBlog = await initialBlogState(urlArr[2]);
         //console.log('blogState', activeBlog);
         initialStateJson.blogs.activeBlog = {
            "blog": activeBlog,
            "error": null,
            "loading": false
         };
         titleHtml = activeBlog.titleHtml;
         descriptionHtml = activeBlog.descriptionHtml;
      }
      if (urlArr.length >= 3 && urlArr[1] === 'goods') {
         let activeGood = await initialGoodState(urlArr[3]);
         // console.log('goodState', activeGood);
         initialStateJson.goods.activeGood = {
            "good": activeGood,
            "error": null,
            "loading": false
         };
         titleHtml = activeGood.titleHtml;
         descriptionHtml = activeGood.descriptionHtml;
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

