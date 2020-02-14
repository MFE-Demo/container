const express = require("express");
const session = require("express-session");
const initSession = require("./middleware/initSession");
const ac = require("./controllers/authController");

const app = express();

//Would place server port variable and others like the session secret + API Keys in an ignored .env file
const SERVER_PORT = 3137;

app.use(express.json());

app.use(
  session({
    secret: "someSecret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

app.use(initSession);

//Authentication Endpoints
app.post("/api/login", ac.login);
app.delete("/api/logout", ac.logout);
