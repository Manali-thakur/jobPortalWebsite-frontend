import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import expressEjsLayouts from "express-ejs-layouts";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";
import userRouter from "./src/routes/user.routes.js";
import jobRouter from "./src/routes/job.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionSecret =
  process.env.SESSION_SECRET ||
  (process.env.NODE_ENV === "production"
    ? null
    : "development-only-session-secret");

if (!sessionSecret) {
  throw new Error("Set SESSION_SECRET before running in production");
}

const server = express();

//  ejs setup
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));

// middleware
server.use(express.urlencoded({ extended: true }));
// server.use(express.json()); //read data from req.body
server.use(cookieParser());
server.use((req, res, next) => {
  res.locals.lastVisit = null;
  next();
});
server.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);
server.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
server.use(express.static(path.join(__dirname, "public"))); //making file publically available
server.use("/css", express.static(path.join(__dirname, "src", "views", "css")));
server.use("/images", express.static(path.join(__dirname, "src", "views", "images")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(setLastVisit);
server.use(expressEjsLayouts);
server.set("layout", "layouts/layout"); // set default layout

// routes
server.get("/", (req, res) => res.render("landing-page"));
server.use("/", userRouter);
server.use("/", jobRouter);

server.use((req, res) => res.status(404).render("404"));

export default server;
