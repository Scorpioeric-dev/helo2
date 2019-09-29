require("dotenv/config");
const express = require("express");
const massive = require("massive");
const app = express();
const session = require("express-session");
const { connection_string, port, session_secret } = process.env;
const ctrl = require("./controller");

//middleware
app.use(express.json());
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  })
);

//endpoints
app.post("/api/auth/login", ctrl.login);
app.post("/auth/register", ctrl.register);
app.get("/api/posts", ctrl.getPosts);
app.get("/api/posts/:userid", ctrl.getUserPosts);
app.get("/api/post/:postid", ctrl.getAPost);
app.post("/api/post/:userid", ctrl.post);
app.get("/api/mine", ctrl.getSession);
app.post("/api/logout", ctrl.logout);

//massive

massive(connection_string).then(db => {
  app.set("db", db);
  app.listen(port, () => console.log(`${port} Mariachis playing`));
});
