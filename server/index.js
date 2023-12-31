import express from "express";
import "./src/config/database/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import UsersRoute from "./src/api/routes/UsersRoute.js";
import PostsRoute from "./src/api/routes/PostsRoute.js";
import CategoriesRoute from "./src/api/routes/CategoriesRoute.js";
import LandlordsRoute from "./src/api/routes/LandlordsRoute.js";
import FollowsRoute from "./src/api/routes/FollowsRoute.js";
import CommentsRoute from "./src/api/routes/CommentsRoute.js";
import NotificationsRoute from "./src/api/routes/NotificationsRoute.js";
import StatsRoute from "./src/api/routes/StatsRoute.js";
import AuthRoute from "./src/api/routes/AuthRoute.js";
import methodOverride from "method-override";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { facebookAuth } from "./src/config/facebook/index.js";

const PORT = process.env.PORT || 8085;

const app = express();
app.use(express.json(), express.urlencoded(), cors(), cookieParser());
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Configuration FB
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true.valueOf,
//     secret: "SECRET",
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });
// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: facebookAuth.clientID,
//       clientSecret: facebookAuth.clientSecret,
//       callbackURL: facebookAuth.callbackURL,
//     },
//     async (accessToken, refeshToken, profile, cb) => {
//       return cb(null, profile)
//     }
//   )
// );
// configuration socket.io
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });
// io.on("connection", (socket) => {
//   socket.on("send_comment", (newComment) => {
//     socket.broadcast.emit("receive_comment", newComment);
//   });

//   socket.on("reply_comment", (data) => {
//     socket.broadcast.emit("reply_comment", data);
//   });

//   socket.on("edit_comment", (data) => {
//     socket.broadcast.emit("edit_comment", data);
//   });

//   socket.on("delete_comment", (data) => {
//     socket.broadcast.emit("delete_comment", data);
//   });

//   socket.on("send_notification", (newNotification) => {
//     socket.broadcast.emit("receive_notification", newNotification);
//   });
//   socket.on("delete_reply", (data) => {
//     socket.broadcast.emit("delete_reply", data);
//   });
// });

app.use("/api", UsersRoute);
app.use("/api", PostsRoute);
app.use("/api", CategoriesRoute);
app.use("/api", LandlordsRoute);
app.use("/api", FollowsRoute);
app.use("/api", CommentsRoute);
app.use("/api", NotificationsRoute);
app.use("/api", StatsRoute);
app.use("/api", AuthRoute);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
