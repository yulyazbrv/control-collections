const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const CollectionRouter = require("./router/collection-router");
const ItemRouter = require("./router/item-router");
const UserRouter = require("./router/user-router");
const TagRouter = require("./router/tag-router");
const CommentRouter = require("./router/comment-router");
const LikeRouter = require("./router/like-router");
const uri = process.env.DB_URL;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://control-collections-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "https://control-collections.vercel.app",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    },
  })
);

app.use("/api", CollectionRouter);
app.use("/api", ItemRouter);
app.use("/api", UserRouter);
app.use("/api", TagRouter);
app.use("/api", CommentRouter);
app.use("/api", LikeRouter);

const start = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => console.log(`Server listened on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
