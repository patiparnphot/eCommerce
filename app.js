// Setup NPM
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    logger          = require("morgan"),
    fs		    = require("fs"),
    // favicon         = require("serve-favicon"),
    mongoose        = require("mongoose"),
    // passport        = require("passport"),
    // LocalStrategy   = require("passport-local"),
    // FacebookStrategy= require("passport-facebook").Strategy,
    // flash           = require("connect-flash"),
    // session         = require("express-session"),
    methodOverride  = require("method-override"),
    http            = require("http"),
    https	    = require("https"),
    path            = require("path");

import { Helmet } from "react-helmet";

var serverSideRender    = require("./src/serverSideRender"),
    template            = require("./static/template"),
    initialContentState = require("./initial_state/initialContentState.json"),
    initialBlogState    = require("./initial_state/initialBlogState");

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

app.use('/admin', express.static('./admin/static'));
app.use(express.static('./static'));

// Requiring API routes
var blogRoutes = require("./routes/blog"),
    contentRoutes    = require("./routes/content");
//     userRoutes      = require("./routes/user");
    
// Database setup
mongoose.connect("mongodb://patiparn.phot:bomgeo57@ds359298.mlab.com:59298/meatseo" || "mongodb://localhost/bnk48");

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// Point static path to dist

// Setup https method
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "It is me",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(function(user, done){ done(null, user) });
// passport.deserializeUser(function(user, done){ done(null, user) });

// Set our api routes
app.use("/api/contents", contentRoutes);
app.use("/api/blogs", blogRoutes);
// app.use("/api/idols/:id/comments", commentRoutes);

app.get('/date', (req, res, next) => {
     var dt = new Date();
     res.send(dt.toISOString());
});

// Catch all other routes and return the index file
app.get('/admin/*', async (req, res, next) => {
  try {
     //res.sendFile(path.join(__dirname, 'static/example.html'));
var adminServerSideRender    = require("./admin/src/serverSideRender"),
    adminTemplate            = require("./admin/static/template");
     let initialStateJson = initialContentState;
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
const port = '80';
const sslPort = '443';
app.set('port', port);
app.set('sslPort', sslPort);

/**
 * Create HTTP server.
 */
const options = {
    key:  fs.readFileSync('../cert/privkey.pem'),
    cert: fs.readFileSync('../cert/cert.pem')
};
const server = http.createServer(app);
const secureSocketsLayer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`The MEATSEO Server Has Started!`));
secureSocketsLayer.listen(sslPort, () => console.log(`The Secure Sockets Layer Is Connected!`));

