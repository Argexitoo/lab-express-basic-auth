// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
const MONGO_URI = require('./db/index');
// require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const session = require("express-session")

const MongoStore = require('connect-mongo')

const cookieParser = require('cookie-parser')

const { isLoggedIn } = require('./middleware');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();
app.use(session({secret: 'somevalue'}))

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require("./routes/auth");

app.use(cookieParser());

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 24 * 60 * 60,
      }),
     secret: 'Ironhack',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

app.use("/", authRoutes);

app.use("/main", index);

app.use("/private", index);




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

