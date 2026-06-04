const express = require("express");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LNCTConnect API Running");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;