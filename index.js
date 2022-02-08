const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();
const products = require("./routes/products");
const home = require("./routes/home");

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/products", products);
app.use("/", home);

console.log("Application Name: " + config.get("name"));
console.log("Password: " + config.get("password"));

if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled...");
}

app.use(logger);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
