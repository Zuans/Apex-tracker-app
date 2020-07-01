const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

// Load env
dotenv.config({ path: "./config.env" });

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set profile routes
app.use("/api/v1/profile", require("./router/profile"));

// handle production

if (process.env.NODE_ENV === "production") {
  // Set static file
  app.use(express.static(__dirname + "/public/"));

  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Port
const port = process.env.PORT || 8000;
const mode = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`server running in ${mode} mode on port ${port}`);
});
