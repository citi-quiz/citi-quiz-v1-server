process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
const session = require("express-session");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// ** Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
};
app.use(cors(corsConfig));

// ? Server Logs
const Pig = require("pigcolor");

// TODO: Server PORT
// ? Port TEST: 8080
const port = process.env.PORT || 8090;

// ************************ Import all routes here **********************

// ?? USER

const userRoute = require("./routers/user");
const adminRoute = require("./routers/admin");

// **********************************************************************

//TODO: How to create https server?
// ? htts Server Setup

/**
 * We need to start out with a word about SSL certificates. Speaking generally, there are two kinds of certificates:
 * those signed by a 'Certificate Authority', or CA, and 'self-signed certificates'.
 * A Certificate Authority is a trusted source for an SSL certificate,
 * and using a certificate from a CA allows your users to trust the identity of your website.
 * In most cases, you would want to use a CA-signed certificate in a production environment - for testing purposes, however, a self-signed certificate will do just fine.
 */
// ** LINK - https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/#:~:text=To%20start%20your%20https%20server,the%20file)%20on%20the%20terminal.&text=or%20in%20your%20browser%2C%20by,to%20https%3A%2F%2Flocalhost%3A8000%20.

const options = {
  key: fs.readFileSync("./.cert/key.pem"),
  cert: fs.readFileSync("./.cert/cert.pem"),
};
// ?

//TODO: Mongoose Setup Node
// ******************************************************************* DB Connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE_PRODUCTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Pig.db();
  });

// ?? Session Store Connection
// ** Mongo DB Store configuraton for session storage
const MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
  uri: "mongodb+srv://helpcitiquiz:citiciti@cluster0.hzfvfpa.mongodb.net/?retryWrites=true&w=majority",
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: "This is a secret",
    cookie: {
      sameSite: false,
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  console.log("GET Request");
  console.log("Session ID - ", req.sessionID);
  return res.send({
    msg: "citi-quiz.com - Server",
  });
});

app.get("/how", (req, res) => {
  console.log("How ? ");
  console.log("Session ID - ", req.sessionID);
  if (req.session.love === "possible") {
    console.log("May be try");
    req.session.love = "LOVE";
  }
  req.session.love = "possible";
  return res.send({
    msg: "How",
  });
});

app.get("/get/token", (req, res) => {
  return res.json({
    token: "huihsihu23iurh2r6544",
  });
});

app.post("/view/token", (req, res) => {
  console.log("TOKEN GET - ", req.body.token);
});

//********************* All Route Middlewares **********************************
// ? API Mode
const MOBILE = "/api/mobile";
const WEB = "/api/web";

// *****************************************************************************

app.use(WEB, userRoute);
app.use(WEB, adminRoute);

// TODO: Starting HTTPs Node Server
// ****************************************************************** Node Server
app.listen(port, () => {
  Pig.server(port);
});

// exports.app = functions.https.onRequest(app);

// https.createServer(options, app)
//     .listen(port, function() {
//         Pig.server(port);
//     });
