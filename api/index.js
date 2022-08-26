const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./setup/routes/users");
const authRoute = require("./setup/routes/auth");
const conversationRoute = require("./setup/routes/conversation");
const messageRoute = require("./setup/routes/message");
const postRoute = require("./setup/routes/post");
const path = require("path");
const cors = require("cors");
const router = express.Router();

dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("new connected");
  }
);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  "/images",
  express.static(path.join(__dirname, "./setup/public/images"))
);

//midllware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./setup/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
var upload = multer({
  storage: storage,
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.log(req.file);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.listen(8800, () => {
  console.log("listening to 8800");
});
