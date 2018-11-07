require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  massive = require("massive"),
  bcrypt = require("bcryptjs");

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(db => app.set("db", db));

app.post("/auth/signup", async (req, res) => {
  let { email, password } = req.body;
  const db = req.app.get("db");
  let foundUser = await db.user_check([email]);
  if (foundUser[0]) return res.status(409).send("Email already exists.");
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  let user = await db.create_user([email, hash]);
  req.session.user = user[0];
  res.status(200).send(req.session.user);
});

app.post("/auth/login", (req, res) => {});

app.listen(SERVER_PORT, () => {
  console.log(`Magic is happenin on port ${SERVER_PORT}`);
});
