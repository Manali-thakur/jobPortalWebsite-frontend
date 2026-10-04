import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressEjsLayouts from "express-ejs-layouts";
import userRouter from "./src/routes/user.routes.js";
import jobRouter from "./src/routes/job.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = express();

//  ejs setup
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));

// middleware
server.use(express.urlencoded({ extended: true }));
// server.use(express.json()); //read data from req.body
server.use(express.static(path.join(__dirname, "public"))); //making file publically available
server.use(expressEjsLayouts);
server.set("layout", "layouts/layout"); // set default layout

// routes
server.get("/", (req, res) => res.render("landing-page"));
server.use("/", userRouter);
server.use("/", jobRouter);

server.use((req, res) => res.status(404).render("404"));

export default server;
